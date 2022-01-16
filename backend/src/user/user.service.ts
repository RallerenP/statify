import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }
  
  async create(dto: CreateUserDTO): Promise<User> {
    const { username, password, role } = dto;

    const user = await this.userModel.create({ username, password, role })

    await user.save();

    return this.findOne(username);
  }

}
