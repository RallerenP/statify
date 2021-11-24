import { CreateTileDTO } from './dtos/create-tile-dto';
import { TileService } from './services/tile.service';
import { Controller, Delete, Get, Param, Body, Put, Post } from '@nestjs/common';
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
   * Create a tile.
   */
  @Post('/:url(*)')
  createTile(
    @Param('url') url: string,
    @Body() dto: CreateTileDTO,
  ): Promise<Tile> {
    return this.tileService.create(url, dto);
  }

  /**
   * Delete a tile
   */
  @Delete('/:id')
  deleteTile(@Param('id') id: string) {
    this.tileService.delete(id);
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
