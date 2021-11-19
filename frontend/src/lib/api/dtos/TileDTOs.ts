export interface TileDTO {
  _id: string;
  x: number,
  y: number,
  width: number,
  height: number,
  content: StatTileDTO
}

export interface StatTileDTO extends TileDTO {
  source: string,
  type: 'StatTile'
  label: string
}

export interface UpdateTileDTO {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface CreateTileDTO {
  x: number,
  y: number,
  width: number,
  height: number,
  type: string,
}

export interface CreateStatTileDTO extends CreateTileDTO{
  label: string;
  source: string;
}