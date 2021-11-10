import { TileService } from './tile.service';
import { CreateStatTileDTO } from './dtos/CreateTileDTO';
import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { UpdateTileDTO } from './dtos/UpdateTileDTO';

@Controller('tile')
export class TileController {

  constructor(private readonly tileService: TileService) {}

  @Post('/**/StatTile')
  createTile(
    @Body() createTileDto: CreateStatTileDTO,
    @Req() request: Request,
  ) {
    const url = request.url.substring(5, request.url.length - 9);

    return this.tileService.create(createTileDto, url);
  }

  @Get('/*')
  getTiles(@Req() request: Request) {
    const url = request.url.substring(5);

    return this.tileService.getAll(url);
  }

  @Put('/:id')
  updateTile(@Param('id') id: string, @Body() updateTileDTO: UpdateTileDTO) {
    return this.tileService.update(id, updateTileDTO);
  }

}
