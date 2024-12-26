import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserIdDto {
  @IsNotEmpty()
  id: number;
}

export class updateUserDto extends PartialType(UserDto) {}

export class UserResponseDto extends OmitType(UserDto, ['password']) {}
