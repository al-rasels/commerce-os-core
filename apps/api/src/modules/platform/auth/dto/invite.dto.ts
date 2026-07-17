import { IsEmail, IsString, IsOptional } from 'class-validator';

export class InviteDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  roleName?: string;
}
