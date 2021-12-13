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

export interface TileDTO {
  _id: string;
  x: number,
  y: number,
  width: number,
  height: number,
  content: TileContentDTO[]
  link?: string
}

export interface TileContentDTO {
  label: string,
  dataSource: string
  description: string;
  type: TileTypes, 
}

export interface CreateTileDTO extends Omit<TileDTO, '_id'> {}