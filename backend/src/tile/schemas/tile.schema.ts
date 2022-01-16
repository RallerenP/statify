import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as _Schema } from 'mongoose';

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

export enum TileTypes {
  'Number' = 'NUMBER',
  'PieChart' = 'PIE_CHART',
  'BarChart' = 'BAR_CHART',
  'LineChart' = 'LINE_CHART',
  'ScatterChart' = 'SCATTER_CHART',
  'OnOff' = 'ON_OFF',
  'Divider' = 'DIVIDER',
  'Header' = 'HEADER',
  'Description' = 'DESCRIPTION'
}

@Schema()
export class Content {
  @Prop({ required: true })
  label: string;
  
  @Prop({ required: true })
  dataSource: string

  @Prop({ required: true })
  type: string;
}

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

  @Prop({ required: true })
  content: Content[]

  @Prop({ required: false })
  link?: string;

  @Prop({ default: false })
  public: string
}



export const TileSchema = SchemaFactory.createForClass(Tile);
