import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Request() req: any, @Body() signInDto: any) {
    return this.authService.login(req.tenantContext, signInDto.email, signInDto.password);
  }
}