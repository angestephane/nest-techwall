import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  password: string;
}
