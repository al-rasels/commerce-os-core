import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { RoleRepository } from './role.repository';
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, RoleRepository],
  exports: [UsersService, UsersRepository, RoleRepository],
})
export class UsersModule {}
