import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStatTileDTO } from '../stat-tile/dto/create-stat-tile.dto';
import { UpdateStatTileDTO } from '../stat-tile/dto/update-stat-tile.dto';
import { StatTile } from '../tile/schemas/stat-tile.schema';
import { StatTileService } from '../stat-tile/stat-tile.service';

@Controller('/stat-tile')
@ApiTags('Statistic Tiles')
export class StatTileController {
  constructor(private readonly statTileService: StatTileService) {}

  @Post('/:url(*)')
  create(@Param('url') url: string, @Body() dto: CreateStatTileDTO) {
    return this.statTileService.create(`/${url}`, dto);
  }

  /**
   * Update an already existing StatTile
   */
  @Put('/:id')
  updateStat(
    @Param('id') id: string,
    @Body() dto: UpdateStatTileDTO,
  ): Promise<StatTile> {
    return this.statTileService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.statTileService.delete(id);
  }
  
}
