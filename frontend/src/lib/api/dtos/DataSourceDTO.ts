import type { TileTypes } from './TileDTOs';

export interface DataSourceDTO {
  value: any;
  description: string;
  compatible: TileTypes[];
}