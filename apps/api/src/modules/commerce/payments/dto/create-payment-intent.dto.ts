import { IsUUID } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsUUID()
  order_id: string;
}
