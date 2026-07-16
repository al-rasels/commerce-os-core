import { IsOptional, IsUUID, IsString } from 'class-validator';

export class CreateCartDto {
  @IsOptional()
  @IsUUID()
  customer_id?: string;

  @IsOptional()
  @IsString()
  session_id?: string;
}
