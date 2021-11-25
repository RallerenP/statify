export enum TileTypes {
  'Number' = 'NUMBER',
  'PieChart' = 'PIE_CHART',
  'BarChart' = 'BAR_CHART',
  'LineChart' = 'LINE_CHART',
  'ScatterChart' = 'SCATTER_CHART',
  'OnOff' = 'ON_OFF',
}

export interface TileDTO {
  _id: string;
  x: number,
  y: number,
  width: number,
  height: number,
  type: TileTypes, 
  content: TileContentDTO
}

export interface TileContentDTO {
  label: string,
  dataSource: string
}

export interface CreateTileDTO extends Omit<TileDTO, '_id'> {}