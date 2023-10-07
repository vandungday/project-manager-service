import { RoleType } from '@/common/enums';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  @IsEnum(RoleType)
  role?: RoleType;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
