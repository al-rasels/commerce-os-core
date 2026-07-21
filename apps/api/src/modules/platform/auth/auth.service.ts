import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
const { authenticator } = require('otplib');
import * as QRCode from 'qrcode';
import { UsersService } from '../users/users.service';
import { RedisService } from '../redis/redis.service';
import { TenantContext } from '../tenant/tenant-context';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MfaVerifyDto } from './dto/mfa-verify.dto';
import { MfaDisableDto } from './dto/mfa-disable.dto';
import { InviteDto } from './dto/invite.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
  ) {}

  async register(ctx: TenantContext, dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(ctx, dto.email);
    if (existing) throw new ConflictException('Email already registered');

    const role = await this.usersService.findRoleByName(ctx, dto.roleName ?? 'member');
    if (!role) throw new NotFoundException('Default role not found');

    const hash = await argon2.hash(dto.password);
    const user = await this.usersService.create(ctx, {
      email: dto.email,
      password_hash: hash,
      role_id: role.id,
    });

    const tokens = await this.generateTokens(
      user.id,
      ctx.tenantId,
      ((role as any).permissions as string[]) || [],
    );
    return {
      user: { id: user.id, email: user.email, role: role.name },
      ...tokens,
    };
  }

  async login(ctx: TenantContext, dto: LoginDto) {
    const user = (
      await this.usersService.findManyWithRole(ctx, {
        where: { email: dto.email },
      })
    )[0];
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (user.status === 'suspended')
      throw new UnauthorizedException('Account suspended');
    if (user.status === 'pending')
      throw new UnauthorizedException('Account not yet activated');

    const valid = await argon2.verify(user.password_hash, dto.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    if (user.mfa_enabled) {
      const mfaToken = await this.jwtService.signAsync(
        { sub: user.id, tenant_id: ctx.tenantId, mfa_pending: true },
        { expiresIn: '5m' },
      );
      return { mfa_required: true, mfa_token: mfaToken };
    }

    const tokens = await this.generateTokens(
      user.id,
      ctx.tenantId,
      ((user.role as any).permissions as string[]) || [],
    );
    return {
      user: { id: user.id, email: user.email, role: user.role.name },
      ...tokens,
    };
  }

  async mfaVerify(ctx: TenantContext, mfaToken: string, dto: MfaVerifyDto) {
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(mfaToken, {
        ignoreExpiration: false,
      });
    } catch {
      throw new UnauthorizedException('MFA token expired or invalid');
    }
    if (!payload.mfa_pending)
      throw new UnauthorizedException('Invalid MFA token');

    const user = await this.usersService.findUniqueWithRoleFull(ctx, payload.sub);
    if (!user || !user.mfa_secret)
      throw new UnauthorizedException('MFA not configured');

    const verified = authenticator.check(dto.token, user.mfa_secret);
    if (!verified) throw new UnauthorizedException('Invalid MFA code');

    const tokens = await this.generateTokens(
      user.id,
      ctx.tenantId,
      ((user.role as any).permissions as string[]) || [],
    );
    return {
      user: { id: user.id, email: user.email, role: user.role.name },
      ...tokens,
    };
  }

  async setupMfa(ctx: TenantContext, userId: string) {
    const secret = authenticator.generateSecret();
    const appName = 'CommerceOS';
    const otpauth = authenticator.keyuri(userId, appName, secret);
    const qrCode = await QRCode.toDataURL(otpauth);

    await this.usersService.updateUser(ctx, userId, { mfa_secret: secret });

    return { secret, qr_code: qrCode };
  }

  async verifyAndEnableMfa(
    ctx: TenantContext,
    userId: string,
    dto: MfaVerifyDto,
  ) {
    const user = await this.usersService.findUnique(ctx, userId);
    if (!user || !user.mfa_secret)
      throw new NotFoundException('MFA not set up');

    const verified = authenticator.check(dto.token, user.mfa_secret);
    if (!verified) throw new UnauthorizedException('Invalid MFA code');

    await this.usersService.updateUser(ctx, userId, { mfa_enabled: true });
    return { message: 'MFA enabled successfully' };
  }

  async disableMfa(ctx: TenantContext, userId: string, dto: MfaDisableDto) {
    const user = await this.usersService.findUnique(ctx, userId);
    if (!user) throw new NotFoundException('User not found');

    const valid = await argon2.verify(user.password_hash, dto.password);
    if (!valid) throw new UnauthorizedException('Invalid password');

    await this.usersService.updateUser(ctx, userId, {
      mfa_secret: null,
      mfa_enabled: false,
    });
    return { message: 'MFA disabled successfully' };
  }

  async forgotPassword(ctx: TenantContext, dto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(ctx, dto.email);
    if (!user)
      return { message: 'If the email exists, a reset link has been sent' };

    const token = await this.jwtService.signAsync(
      { sub: user.id, tenant_id: ctx.tenantId, purpose: 'reset_password' },
      { expiresIn: '15m' },
    );

    const key = `reset_token:${ctx.tenantId}:${user.id}`;
    await this.redis.set(key, token, 900);
    // In production, send email with reset link containing the token

    return { message: 'If the email exists, a reset link has been sent' };
  }

  async resetPassword(ctx: TenantContext, dto: ResetPasswordDto) {
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(dto.token);
    } catch {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
    if (payload.purpose !== 'reset_password')
      throw new UnauthorizedException('Invalid token purpose');

    const key = `reset_token:${ctx.tenantId}:${payload.sub}`;
    const stored = await this.redis.get(key);
    if (!stored || stored !== dto.token)
      throw new UnauthorizedException('Token already used or expired');

    await this.redis.del(key);

    const hash = await argon2.hash(dto.password);
    await this.usersService.updateUser(ctx, payload.sub, { password_hash: hash });

    return { message: 'Password reset successfully' };
  }

  async changePassword(
    ctx: TenantContext,
    userId: string,
    dto: ChangePasswordDto,
  ) {
    const user = await this.usersService.findUnique(ctx, userId);
    if (!user) throw new NotFoundException('User not found');

    const valid = await argon2.verify(user.password_hash, dto.currentPassword);
    if (!valid)
      throw new UnauthorizedException('Current password is incorrect');

    const hash = await argon2.hash(dto.newPassword);
    await this.usersService.updateUser(ctx, userId, { password_hash: hash });

    return { message: 'Password changed successfully' };
  }

  async invite(ctx: TenantContext, dto: InviteDto) {
    const existing = await this.usersService.findByEmail(ctx, dto.email);
    if (existing)
      throw new ConflictException('User already exists with this email');

    const role = await this.usersService.findRoleByName(ctx, dto.roleName ?? 'member');
    if (!role) throw new NotFoundException('Role not found');

    const tempPassword = crypto.randomUUID().slice(0, 12);
    const hash = await argon2.hash(tempPassword);

    await this.usersService.create(ctx, {
      email: dto.email,
      password_hash: hash,
      role_id: role.id,
      status: 'pending',
    });

    // In production, send invitation email with setup link and temp password

    return { message: 'Invitation sent' };
  }

  async refresh(ctx: TenantContext, refreshToken: string) {
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        ignoreExpiration: false,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const stored = await this.redis.get(`refresh:${payload.sub}`);
    if (!stored || stored !== refreshToken) {
      throw new UnauthorizedException('Refresh token revoked');
    }

    const user = await this.usersService.findUniqueWithRoleFull(ctx, payload.sub);
    if (!user) throw new UnauthorizedException('User not found');

    const tokens = await this.generateTokens(
      user.id,
      ctx.tenantId,
      ((user.role as any).permissions as string[]) || [],
    );
    return tokens;
  }

  async me(ctx: TenantContext, userId: string) {
    const user = await this.usersService.findUniqueWithRoleFull(ctx, userId);
    if (!user) throw new NotFoundException('User not found');

    const { password_hash, mfa_secret, ...rest } = user as any;
    return { ...rest, mfa_configured: !!mfa_secret };
  }

  async logout(ctx: TenantContext, userId: string) {
    await this.redis.del(`refresh:${userId}`);
    return { message: 'Logged out successfully' };
  }

  private async generateTokens(
    userId: string,
    tenantId: string,
    permissions: string[],
  ) {
    const payload = { sub: userId, tenant_id: tenantId, permissions };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    await this.redis.set(`refresh:${userId}`, refreshToken, 7 * 24 * 3600);

    return { access_token: accessToken, refresh_token: refreshToken };
  }
}
