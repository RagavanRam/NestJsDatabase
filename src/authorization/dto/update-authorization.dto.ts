import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BaseDto } from 'src/base-dto';

export class UpdateAuthorizationDto extends BaseDto {
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

  @IsOptional()
  @IsNumber()
  roleId: number;

  @IsOptional()
  @IsNumber()
  permissionId: number;
}

export class UpdateMultiAuthorizationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  updateData: UpdateAuthorizationDto;
}
