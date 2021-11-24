export enum TileTypes {
  'Number',
  'PieChart',
  'BarChart',
  'LineChart',
  'ScatterChart',
  'OnOff',
}

export interface TileDTO {
  _id: string;
  x: number,
  y: number,
  width: number,
  height: number,
  type: TileTypes, 
  content: TileDTOContent
}

export interface TileDTOContent {
  label: string,
  dataSource: string
}

export interface CreateTileDTO extends Omit<TileDTO, '_id'> {}