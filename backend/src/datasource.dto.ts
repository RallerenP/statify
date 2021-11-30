import { TileTypes } from "./tile/schemas/tile.schema";

export interface DataSourceDTO {
  value: any;
  description: string;
  compatible: TileTypes[];
}