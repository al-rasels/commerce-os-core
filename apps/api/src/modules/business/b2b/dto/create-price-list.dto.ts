import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber, Min } from 'class-validator';

export class PriceListRuleDto {
  @IsString()
  @IsNotEmpty()
  variant_id!: string;

  @IsNumber()
  @Min(1)
  min_quantity!: number;

  @IsNumber()
  @Min(0)
  unit_price!: number;
}

export class CreatePriceListDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsArray()
  @IsOptional()
  rules?: PriceListRuleDto[];
}
