import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsEnum(['draft', 'active', 'archived'])
  status?: string;

  @IsOptional()
  @IsUUID()
  category_id?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;
}
