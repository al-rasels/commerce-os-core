import { IsUUID, IsOptional, IsInt, Min } from 'class-validator';

export class CreateRefundDto {
  @IsUUID()
  order_id: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  amount_cents?: number;
}
