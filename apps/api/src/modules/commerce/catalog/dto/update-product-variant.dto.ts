import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateProductVariantDto {
  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  name?: string;

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
