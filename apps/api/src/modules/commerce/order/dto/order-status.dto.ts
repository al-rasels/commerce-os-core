import { IsString, IsIn } from 'class-validator';

const VALID_STATUSES = ['paid', 'fulfilled', 'cancelled', 'refunded'] as const;

export class OrderStatusDto {
  @IsString()
  @IsIn(VALID_STATUSES)
  status: string;
}
