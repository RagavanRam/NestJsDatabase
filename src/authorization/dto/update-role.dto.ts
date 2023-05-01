import { IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base-dto';

export class UpdateRoleDto extends BaseDto {
  @IsOptional()
  @IsString()
  name: string;
}
