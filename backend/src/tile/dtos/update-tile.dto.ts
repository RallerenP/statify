import { IsNotEmpty } from 'class-validator';

export class UpdateTileDTO {
  @IsNotEmpty()
  width: number;

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  x: number;

  @IsNotEmpty()
  y: number;
}
