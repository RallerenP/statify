import { IsNotEmpty } from 'class-validator';
import { CreateTileDTO } from '../../tile/dtos/create-tile-dto';

export class CreateStatTileDTO extends CreateTileDTO {
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  source: string;
}
