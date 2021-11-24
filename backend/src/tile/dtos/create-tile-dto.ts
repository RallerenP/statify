import { IsNotEmpty, IsUrl } from 'class-validator';

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
  type: string;

  content: CreateTileContentDTO;
}

class CreateTileContentDTO {
  @IsNotEmpty()
  label: string;

  @IsUrl()
  dataSource: string;
}
