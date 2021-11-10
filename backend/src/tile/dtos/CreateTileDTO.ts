import { IsNotEmpty } from 'class-validator';

export class CreateStatTileDTO {
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  source: string;

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

  // content_id: string;
}

