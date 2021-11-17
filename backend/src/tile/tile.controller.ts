import { TileService } from './services/tile.service';
import { Controller, Delete, Get, Param, Body, Put } from '@nestjs/common';
import { UpdateTileDTO } from './dtos/update-tile.dto';
import { Tile } from './schemas/tile.schema';
import { ApiTags } from '@nestjs/swagger';

@Controller('tile')
@ApiTags('Tiles')
export class TileController {
  constructor(private readonly tileService: TileService) {}
  /**
   * Get all related tiles for an url
   */
  @Get('/:url(*)')
  getTiles(@Param('url') url: string): Promise<Tile[]> {
    return this.tileService.getAll(`/${url}`);
  }

  /**
   * Update an already existing tile
   */
  @Put('/:id')
  updateTile(
    @Param('id') id: string,
    @Body() updateTileDTO: UpdateTileDTO,
  ): Promise<Tile> {
    return this.tileService.update(id, updateTileDTO);
  }
}
