import { IsString, IsOptional, IsUUID, IsInt } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsUUID()
  parent_id?: string | null;

  @IsOptional()
  @IsInt()
  sort_order?: number;
}
