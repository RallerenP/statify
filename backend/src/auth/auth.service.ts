import { UserDocument } from './../user/schemas/user.schema';

import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user/schemas/user.schema';
import { CreateUserDTO } from '../user/dtos/create-user.dto';
import { SignupDTO } from './dtos/signup.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly saltRounds = 12;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validate(username: string, password: string): Promise<User | undefined> {
    const user = await this.userService.findOne(username);

    if (!user || !this.verify(password, await user.password)) return null;

    return user;
  }

  async login({ username, role, _id }: UserDocument) {
    const payload = { username, role, _id };

    return {
      access_token: this.jwtService.sign(payload)
    }

  }

  async signup(dto: SignupDTO): Promise<User | undefined> {
    console.log(dto)
    const { username, password, secret } = dto;
    const userDto: CreateUserDTO = 
      { 
        username, 
        password: await this.encrypt(password), 
        role: secret === process.env.secret ? 'admin' : 'guest' 
      }
    
    const user = await this.userService.create(userDto)

    return user;
  }

  private async encrypt(data: string): Promise<string>  {
    return await bcrypt.hash(data, this.saltRounds);
  }

  private async verify(data: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(data, hash);
  }
}
