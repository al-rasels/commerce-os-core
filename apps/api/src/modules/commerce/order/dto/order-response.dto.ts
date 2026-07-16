import { IsUUID, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsUUID()
  id: string;

  @IsUUID()
  variant_id: string;

  @IsString()
  sku: string;

  quantity: number;

  unit_price: number;
}

export class OrderResponseDto {
  @IsUUID()
  id: string;

  @IsUUID()
  tenant_id: string;

  @IsOptional()
  @IsUUID()
  customer_id?: string;

  @IsString()
  status: string;

  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  created_at: Date;
}
