import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { B2bService } from './b2b.service';
import { CreateCompanyDto, UpdateCompanyStatusDto } from './dto/create-company.dto';
import { CreatePriceListDto } from './dto/create-price-list.dto';

@Controller('v1/business/b2b')
@UseGuards(TenantAuthGuard)
export class B2bController {
  constructor(private readonly b2bService: B2bService) {}

  @Get('companies')
  async getCompanies(@GetTenantContext() ctx: TenantContext) {
    return this.b2bService.getCompanies(ctx);
  }

  @Get('companies/:id')
  async getCompanyById(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.b2bService.getCompanyById(ctx, id);
  }

  @Post('companies')
  async createCompany(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreateCompanyDto,
  ) {
    return this.b2bService.createCompany(ctx, dto);
  }

  @Patch('companies/:id/status')
  async updateCompanyStatus(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateCompanyStatusDto,
  ) {
    return this.b2bService.updateCompanyStatus(ctx, id, dto);
  }

  @Get('price-lists')
  async getPriceLists(@GetTenantContext() ctx: TenantContext) {
    return this.b2bService.getPriceLists(ctx);
  }

  @Post('price-lists')
  async createPriceList(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreatePriceListDto,
  ) {
    return this.b2bService.createPriceList(ctx, dto);
  }
}
