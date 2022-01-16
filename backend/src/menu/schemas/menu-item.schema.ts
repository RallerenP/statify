import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mongoose, Types } from 'mongoose';

export type MenuItemDocument = MenuItem & Document;

@Schema()
export class MenuItem {
  @Prop({ unique: true })
  url: string;

  @Prop()
  label: string;

  @ApiProperty({ type: () => [MenuItem] })
  @Prop({ type: [Types.ObjectId], ref: MenuItem.name, autopopulate: true })
  children: MenuItemDocument[];

  @Prop({ default: false })
  top: boolean;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);


