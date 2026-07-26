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
}
