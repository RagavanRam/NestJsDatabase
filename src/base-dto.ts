import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class BaseDto {
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
