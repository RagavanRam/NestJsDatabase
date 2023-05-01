import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordInitDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
