import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from '../users/users.repository';
import { RoleRepository } from '../users/role.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dev-secret-key-change-in-prod',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, UsersRepository, RoleRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
