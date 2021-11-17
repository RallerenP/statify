import { IsNotEmpty } from 'class-validator';

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
}
