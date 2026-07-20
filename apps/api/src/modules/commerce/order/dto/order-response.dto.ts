import {
  IsUUID,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsInt,
} from 'class-validator';
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

  @IsInt()
  subtotal: number;

  @IsInt()
  tax: number;

  @IsInt()
  shipping: number;

  @IsInt()
  total: number;

  @IsString()
  currency: string;

  @IsString()
  channel: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  created_at: Date;
}
