import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { TenantContext } from '../tenant/tenant-context';
import { TenantAuthGuard } from './guards/tenant-auth.guard';
import { RequirePermissions } from './decorators/permissions.decorator';
import { PermissionGuard } from './guards/permission.guard';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@GetTenantContext() ctx: TenantContext, @Body() dto: RegisterDto) {
    return this.authService.register(ctx, dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@GetTenantContext() ctx: TenantContext, @Body() dto: LoginDto) {
    return this.authService.login(ctx, dto);
  }

  @Post('mfa/verify')
  @HttpCode(HttpStatus.OK)
  async mfaVerify(
    @GetTenantContext() ctx: TenantContext,
    @Body('mfa_token') mfaToken: string,
    @Body() dto: MfaVerifyDto,
  ) {
    return this.authService.mfaVerify(ctx, mfaToken, dto);
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
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@GetTenantContext() ctx: TenantContext, @Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(ctx, dto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@GetTenantContext() ctx: TenantContext, @Body() dto: ResetPasswordDto) {
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
    @Body('refresh_token') refreshToken: string,
  ) {
    return this.authService.refresh(ctx, refreshToken);
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
    @Body('user_id') userId: string,
  ) {
    return this.authService.logout(ctx, userId);
  }
}
