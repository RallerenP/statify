import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateTileDTO {
  @IsNotEmpty()
  width: number;

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  x: number;

  @IsNotEmpty()
  y: number;

  content: UpdateTileContentDTO;
}

class UpdateTileContentDTO {
  @IsNotEmpty()
  label: string;

  @IsUrl()
  dataSource: string;
}
