import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TenantAuthGuard } from '../auth/guards/tenant-auth.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../tenant/tenant-context';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Controller('v1/users')
@UseGuards(TenantAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async list(
    @GetTenantContext() ctx: TenantContext,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.usersService.list(ctx, { page, limit, search, status });
  }

  @Get(':id')
  async getById(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.usersService.getById(ctx, id);
  }

  @Patch(':id')
  async update(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser('sub') currentUserId: string,
  ) {
    return this.usersService.update(ctx, id, dto, currentUserId);
  }

  @Patch(':id/status')
  async updateStatus(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateUserStatusDto,
    @CurrentUser('sub') currentUserId: string,
  ) {
    return this.usersService.updateStatus(ctx, id, dto, currentUserId);
  }
}
