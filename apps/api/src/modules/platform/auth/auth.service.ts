import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import * as argon2 from 'argon2';
import { TenantContext } from '../tenant/tenant-context';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private redis: RedisService,
  ) {}

  private async issueTokens(user: { id: string; email: string; tenant_id: string | null; role: { name: string } }) {
    const payload = { sub: user.id, email: user.email, tenant_id: user.tenant_id, role: user.role.name };
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });

    const key = `refresh:${user.tenant_id ?? 'platform'}:${user.id}`;
    const hash = await argon2.hash(refreshToken);
    await this.redis.set(key, hash, 7 * 24 * 60 * 60);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: refreshToken,
    };
  }

  async register(ctx: TenantContext, dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { tenant_id_email: { tenant_id: ctx.tenantId, email: dto.email } },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const role = await this.prisma.role.findFirst({
      where: { tenant_id: ctx.tenantId, name: dto.roleName ?? 'Customer' },
    });

    const hash = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        tenant_id: ctx.tenantId,
        email: dto.email,
        password_hash: hash,
        role_id: role!.id,
      },
    });

    return this.issueTokens({ ...user, role: role! });
  }

  async login(ctx: TenantContext, email: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: { tenant_id_email: { tenant_id: ctx.tenantId, email } },
      include: { role: true },
    });

    if (!user || !(await argon2.verify(user.password_hash, pass))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user);
  }

  async refresh(ctx: TenantContext, userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user || user.tenant_id !== ctx.tenantId) {
      throw new UnauthorizedException('Invalid token');
    }

    const key = `refresh:${ctx.tenantId}:${userId}`;
    const stored = await this.redis.get(key);

    if (!stored || !(await argon2.verify(stored, refreshToken).catch(() => false))) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    await this.redis.del(key);

    return this.issueTokens(user);
  }
}