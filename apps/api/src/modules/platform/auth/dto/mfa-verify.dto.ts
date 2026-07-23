import { IsString, IsNotEmpty } from 'class-validator';

export class MfaVerifyDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
