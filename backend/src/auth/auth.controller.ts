import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '../user/schemas/user.schema';
import { AuthService } from './auth.service';
import { SignupDTO } from './dtos/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  signin(@Req() req: any): Promise<{ access_token: string }> {
    return this.authService.login(req.user)
  }

  @Post('/signup')
  signup(@Body() dto: SignupDTO) {
    return this.authService.signup(dto);
  }
}
