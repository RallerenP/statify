import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class SignupDTO {
  @IsNotEmpty()
  username: string;

  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
  password: string;

  @IsOptional()
  secret: string; // If secret is correct, allow the user to become admin
}