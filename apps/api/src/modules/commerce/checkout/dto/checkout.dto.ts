import { IsUUID } from 'class-validator';

export class CheckoutDto {
  @IsUUID()
  cart_id: string;
}
