import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUrl, ValidateNested } from 'class-validator';


class UpdateTileContentDTO {
  @IsNotEmpty()
  label: string;

  @IsUrl({ require_tld: false })
  dataSource: string;
}


export class UpdateTileDTO {
  width?: number;

  height?: number;

  x?: number;

  y?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateTileContentDTO)
  content?: UpdateTileContentDTO;
}
