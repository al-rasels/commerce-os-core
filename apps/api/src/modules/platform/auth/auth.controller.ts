import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MfaVerifyDto } from './dto/mfa-verify.dto';
import { MfaDisableDto } from './dto/mfa-disable.dto';
import { InviteDto } from './dto/invite.dto';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../tenant/tenant-context';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { TenantAuthGuard } from './guards/tenant-auth.guard';
import { RequirePermissions } from './decorators/permissions.decorator';
import { PermissionGuard } from './guards/permission.guard';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setAuthCookies(res: Response, result: any) {
    if ('access_token' in result && result.access_token) {
      res.cookie('access_token', result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });
    }
    if ('refresh_token' in result && result.refresh_token) {
      res.cookie('refresh_token', result.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 3600 * 1000,
      });
    }
  }

  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 900000 } })
  async register(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(ctx, dto);
    this.setAuthCookies(res, result);
    return result;
  }

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @HttpCode(HttpStatus.OK)
  async login(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(ctx, dto);
    this.setAuthCookies(res, result);
    return result;
  }

  @Post('mfa/verify')
  @HttpCode(HttpStatus.OK)
  async mfaVerify(
    @GetTenantContext() ctx: TenantContext,
    @Body('mfa_token') mfaToken: string,
    @Body() dto: MfaVerifyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.mfaVerify(ctx, mfaToken, dto);
    this.setAuthCookies(res, result);
    return result;
  }

  @Post('mfa/setup')
  @UseGuards(TenantAuthGuard)
  @HttpCode(HttpStatus.OK)
  async setupMfa(
    @GetTenantContext() ctx: TenantContext,
    @Body('user_id') userId: string,
  ) {
    return this.authService.setupMfa(ctx, userId);
  }

  @Post('mfa/enable')
  @UseGuards(TenantAuthGuard)
  @HttpCode(HttpStatus.OK)
  async verifyAndEnableMfa(
    @GetTenantContext() ctx: TenantContext,
    @Body('user_id') userId: string,
    @Body() dto: MfaVerifyDto,
  ) {
    return this.authService.verifyAndEnableMfa(ctx, userId, dto);
  }

  @Post('mfa/disable')
  @UseGuards(TenantAuthGuard)
  @HttpCode(HttpStatus.OK)
  async disableMfa(
    @GetTenantContext() ctx: TenantContext,
    @Body('user_id') userId: string,
    @Body() dto: MfaDisableDto,
  ) {
    return this.authService.disableMfa(ctx, userId, dto);
  }

  @Post('forgot-password')
  @Throttle({ default: { limit: 3, ttl: 900000 } })
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: ForgotPasswordDto,
  ) {
    return this.authService.forgotPassword(ctx, dto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(ctx, dto);
  }

  @Post('change-password')
  @UseGuards(TenantAuthGuard)
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @GetTenantContext() ctx: TenantContext,
    @Body('user_id') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(ctx, userId, dto);
  }

  @Post('invite')
  @UseGuards(TenantAuthGuard, PermissionGuard)
  @RequirePermissions('auth.invite')
  @HttpCode(HttpStatus.OK)
  async invite(@GetTenantContext() ctx: TenantContext, @Body() dto: InviteDto) {
    return this.authService.invite(ctx, dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetTenantContext() ctx: TenantContext,
    @Req() req: Request,
    @Body('refresh_token') bodyRefreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Prefer cookie over body
    const refreshToken = req.cookies?.refresh_token || bodyRefreshToken;
    if (!refreshToken) {
      // Throw 401 if no token provided
      throw new UnauthorizedException('No refresh token provided');
    }
    
    const tokens = await this.authService.refresh(ctx, refreshToken);
    this.setAuthCookies(res, tokens);
    return tokens;
  }

  @Get('me')
  @UseGuards(TenantAuthGuard)
  async me(
    @GetTenantContext() ctx: TenantContext,
    @CurrentUser('sub') userId: string,
  ) {
    return this.authService.me(ctx, userId);
  }

  @Post('logout')
  @UseGuards(TenantAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetTenantContext() ctx: TenantContext,
    @CurrentUser() user: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refresh_token');
    res.clearCookie('access_token');
    return this.authService.logout(ctx, user.sub, user.sid);
  }
}
