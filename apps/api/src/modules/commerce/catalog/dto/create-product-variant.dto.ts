import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateProductVariantDto {
  @IsUUID()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  option_label?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  compare_at_price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
