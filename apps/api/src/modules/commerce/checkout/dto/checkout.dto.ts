import { IsUUID, IsOptional, IsString } from 'class-validator';

export class CheckoutDto {
  @IsUUID()
  cart_id: string;

  @IsOptional()
  @IsUUID()
  shipping_rule_id?: string;

  @IsOptional()
  @IsString()
  promo_code?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  shipping_address?: any;

  @IsOptional()
  billing_address?: any;
}
