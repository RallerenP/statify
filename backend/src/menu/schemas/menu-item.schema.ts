import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Types } from 'mongoose';

export type MenuItemDocument = MenuItem & Document;

@Schema()
export class MenuItem {
  @Prop({ unique: true })
  url: string;

  @Prop()
  label: string;

  @Prop({ type: [Types.ObjectId], ref: MenuItem.name, autopopulate: true })
  children: MenuItemDocument[];

  @Prop({ default: false })
  top: boolean;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
