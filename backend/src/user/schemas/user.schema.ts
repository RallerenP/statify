import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  role: 'admin' | 'guest'

  // Hashed password
  @Exclude()
  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User);