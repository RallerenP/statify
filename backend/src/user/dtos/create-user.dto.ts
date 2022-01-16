import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  username: string;

  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
  password: string;

  @IsOptional()
  role: 'admin' | 'guest';
}