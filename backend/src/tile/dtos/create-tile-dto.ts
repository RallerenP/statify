import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsUrl, ValidateNested } from 'class-validator';
import { TileTypes } from '../schemas/tile.schema';

class CreateTileContentDTO {
  @IsNotEmpty()
  label: string;

  @IsUrl({ require_tld: false })
  dataSource: string;

  @IsEnum(TileTypes)
  type: TileTypes;
}


export class CreateTileDTO {
  @IsNotEmpty()
  width: number;

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  x: number;

  @IsNotEmpty()
  y: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateTileContentDTO)
  content: CreateTileContentDTO;

  @IsOptional()
  link?: string;
}
