import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Request() req: any, @Body() dto: LoginDto) {
    return this.authService.login(req.tenantContext, dto.email, dto.password);
  }

  @Post('register')
  register(@Request() req: any, @Body() dto: RegisterDto) {
    return this.authService.register(req.tenantContext, dto);
  }

  @Post('refresh')
  refresh(@Request() req: any, @Body('user_id') userId: string, @Body('refresh_token') refreshToken: string) {
    return this.authService.refresh(req.tenantContext, userId, refreshToken);
  }
}
