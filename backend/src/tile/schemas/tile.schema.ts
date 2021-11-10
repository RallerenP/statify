import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, RefType, Types } from 'mongoose';
import { StatTile } from './stat-tile.schema';

export type TileDocument = Tile & Document;

// const TileTypes = [
//   'BAR_CHART',
//   'LINE_CHART',
//   'SCATTER_CHART',
//   'PIE_CHART',
//   'NUMBER_STATISTICS',
//   'HISTOGRAM',
//   'ON_OFF',
//   'DIVIDER',
// ];

const TileTypes = [StatTile.name];

@Schema()
export class Tile {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;

  @Prop({ required: true, enum: TileTypes })
  type: string;

  @Prop({ refPath: 'type', type: Types.ObjectId })
  content: string;
}

export const TileSchema = SchemaFactory.createForClass(Tile);
