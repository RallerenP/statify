export interface TileDTO {
  _id: string;
  type: 'StatTile',
  x: number,
  y: number,
  width: number,
  height: number,
  content: StatTileDTO
}

export interface StatTileDTO {
  _id: string,
  source: string,
  label: string
}

export interface UpdateTileDTO {
  width: number;
  height: number;
  x: number;
  y: number;
}