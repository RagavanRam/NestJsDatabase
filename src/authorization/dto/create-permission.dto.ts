import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base-dto';

export class CreatePermissionDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
