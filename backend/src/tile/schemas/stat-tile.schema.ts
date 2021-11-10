import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, RefType, Types } from 'mongoose';

export type StatTileDocument = StatTile & Document;

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

const TileTypes = ['StatTile'];

@Schema()
export class StatTile {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  source: string;
}

export const StatTileSchema = SchemaFactory.createForClass(StatTile);
