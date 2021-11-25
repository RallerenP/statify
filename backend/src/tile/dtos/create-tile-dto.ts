import { Type } from 'class-transformer';
import { IsNotEmpty, IsUrl, ValidateNested } from 'class-validator';

class CreateTileContentDTO {
  @IsNotEmpty()
  label: string;

  @IsUrl({ require_tld: false })
  dataSource: string;
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
  type: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateTileContentDTO)
  content: CreateTileContentDTO;
}
