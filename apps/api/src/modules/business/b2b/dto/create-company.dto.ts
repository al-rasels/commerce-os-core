import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  tax_id?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  credit_limit?: number;

  @IsString()
  @IsOptional()
  contact_email?: string;
}

export class UpdateCompanyStatusDto {
  @IsString()
  @IsNotEmpty()
  status!: 'pending' | 'approved' | 'rejected';
}
