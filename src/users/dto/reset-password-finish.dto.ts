import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordFinishDto {
  @IsNotEmpty()
  @IsString()
  resetKey: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
