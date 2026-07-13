import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TenantContext } from '../tenant/tenant-context';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(ctx: TenantContext, email: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        tenant_id_email: {
          tenant_id: ctx.tenantId,
          email: email
        }
      },
      include: { role: true }
    });

    if (!user || !(await bcrypt.compare(pass, user.password_hash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, tenant_id: user.tenant_id, role: user.role.name };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}