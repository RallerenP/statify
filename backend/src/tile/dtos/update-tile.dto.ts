import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsUrl, ValidateNested } from 'class-validator';
import { TileTypes } from '../schemas/tile.schema';


class UpdateTileContentDTO {
  @IsNotEmpty()
  label: string;

  @IsUrl({ require_tld: false })
  dataSource: string;

  @IsEnum(TileTypes)
  type: TileTypes
}


export class UpdateTileDTO {
  width?: number;

  height?: number;

  x?: number;

  y?: number;

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => UpdateTileContentDTO)
  content?: UpdateTileContentDTO[];
}
