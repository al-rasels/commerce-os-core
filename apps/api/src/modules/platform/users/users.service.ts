import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';
import { TenantContext } from '../tenant/tenant-context';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async list(ctx: TenantContext, query: { page?: string; limit?: string; search?: string; status?: string }) {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(query.limit || '20', 10)));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.search) {
      where.email = { contains: query.search, mode: 'insensitive' };
    }

    if (query.status) {
      where.status = query.status;
    }

    const [data, total] = await Promise.all([
      this.usersRepository.findManyWithRole(ctx, {
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.usersRepository.count(ctx, where),
    ]);

    const sanitized = data.map((u: any) => ({
      id: u.id,
      email: u.email,
      status: u.status,
      role: u.role,
      mfa_enabled: u.mfa_enabled,
      created_at: u.created_at,
    }));

    return {
      data: sanitized,
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
    };
  }

  async getById(ctx: TenantContext, id: string) {
    const user = await this.usersRepository.findUniqueWithRoleFull(ctx, id);
    if (!user) throw new NotFoundException('User not found');

    const { password_hash, mfa_secret, ...rest } = user as any;
    return { ...rest, mfa_configured: !!mfa_secret };
  }

  async update(ctx: TenantContext, id: string, dto: UpdateUserDto, currentUserId: string) {
    if (id === currentUserId) {
      throw new BadRequestException('Cannot update your own user here — use profile settings');
    }

    const user = await this.usersRepository.findUniqueWithRole(ctx, id);
    if (!user) throw new NotFoundException('User not found');

    const data: any = {};
    if (dto.email !== undefined) data.email = dto.email;
    if (dto.role_id !== undefined) data.role_id = dto.role_id;
    if (dto.status !== undefined) data.status = dto.status;

    return this.usersRepository.updateUser(ctx, id, data);
  }

  async updateStatus(ctx: TenantContext, id: string, dto: UpdateUserStatusDto, currentUserId: string) {
    if (id === currentUserId) {
      throw new BadRequestException('Cannot suspend your own account');
    }

    const user = await this.usersRepository.findUniqueWithRole(ctx, id);
    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.updateUser(ctx, id, { status: dto.status });
  }
}
