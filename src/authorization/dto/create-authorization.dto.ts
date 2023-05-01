import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BaseDto } from 'src/base-dto';

export class CreateAuthorizationDto extends BaseDto {
  @IsOptional()
  @IsBoolean()
  create: boolean;

  @IsOptional()
  @IsBoolean()
  read: boolean;

  @IsOptional()
  @IsBoolean()
  update: boolean;

  @IsOptional()
  @IsBoolean()
  delete: boolean;

  @IsOptional()
  @IsBoolean()
  manage: boolean;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsNumber()
  permissionId: number;
}
