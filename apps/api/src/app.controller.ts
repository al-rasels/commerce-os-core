import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('whoami')
  whoami(@Request() req: any) {
    return {
      tenantId: req.tenantContext?.tenantId ?? null,
      domain: req.tenantContext?.domain ?? req.hostname,
      plan: req.tenantContext?.plan ?? null,
    };
  }
}
