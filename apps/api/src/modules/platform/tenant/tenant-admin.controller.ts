import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Query,
    Body,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { TenantAuthGuard } from '../auth/guards/tenant-auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from './tenant-context';
import { PrismaService } from '../../../prisma/prisma.service';

@Controller('v1/admin/tenants')
@UseGuards(TenantAuthGuard, PermissionGuard)
@RequirePermissions('super_admin')
export class TenantAdminController {
    constructor(private prisma: PrismaService) { }

    @Get()
    async list(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('search') search?: string,
    ) {
        const take = Math.min(Number(limit) || 20, 100);
        const skip = ((Number(page) || 1) - 1) * take;

        const where: any = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { domains: { some: { domain: { contains: search, mode: 'insensitive' } } } },
            ];
        }

        const [data, total] = await Promise.all([
            this.prisma.tenant.findMany({
                where,
                skip,
                take,
                include: {
                    domains: true,
                    flags: true,
                    _count: { select: { users: true, products: true, orders: true } },
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.tenant.count({ where }),
        ]);

        return { data, total, page: Number(page) || 1, limit: take };
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { id },
            include: {
                domains: true,
                flags: true,
                _count: { select: { users: true, products: true, orders: true, customers: true } },
            },
        });
        return tenant ?? { notFound: true };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: { name: string; domain: string; plan_id?: string }) {
        const tenant = await this.prisma.tenant.create({
            data: {
                name: body.name,
                plan_id: body.plan_id || 'trial',
                status: 'active',
                domains: {
                    create: { domain: body.domain, is_primary: true },
                },
            },
        });
        return tenant;
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() body: { name?: string; plan_id?: string; status?: string },
    ) {
        return this.prisma.tenant.update({
            where: { id },
            data: {
                ...(body.name !== undefined && { name: body.name }),
                ...(body.plan_id !== undefined && { plan_id: body.plan_id }),
                ...(body.status !== undefined && { status: body.status }),
            },
        });
    }

    @Post(':id/domains')
    @HttpCode(HttpStatus.CREATED)
    async addDomain(@Param('id') id: string, @Body() body: { domain: string; is_primary?: boolean }) {
        return this.prisma.tenantDomain.create({
            data: {
                tenant_id: id,
                domain: body.domain,
                is_primary: body.is_primary ?? false,
            },
        });
    }

    @Delete(':id/domains/:domainId')
    @HttpCode(HttpStatus.OK)
    async removeDomain(@Param('domainId') domainId: string) {
        await this.prisma.tenantDomain.delete({ where: { id: domainId } });
        return { removed: true };
    }

    @Get(':id/flags')
    async getFlags(@Param('id') id: string) {
        return this.prisma.featureFlag.findMany({ where: { tenant_id: id } });
    }

    @Post(':id/flags')
    @HttpCode(HttpStatus.OK)
    async toggleFlag(
        @Param('id') id: string,
        @Body() body: { flag_key: string; enabled: boolean },
    ) {
        return this.prisma.featureFlag.upsert({
            where: { tenant_id_flag_key: { tenant_id: id, flag_key: body.flag_key } },
            create: { tenant_id: id, flag_key: body.flag_key, enabled: body.enabled },
            update: { enabled: body.enabled },
        });
    }
}