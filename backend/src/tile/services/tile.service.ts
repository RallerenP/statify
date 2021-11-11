import { UpdateStatTileDTO } from '../dtos/UpdateStatTileDTO';
import { UpdateTileDTO } from '../dtos/UpdateTileDTO';
import { CreateStatTileDTO } from '../dtos/CreateTileDTO';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tile, TileDocument } from '../schemas/tile.schema';
import { StatTile } from '../schemas/stat-tile.schema';
import { StatTileService } from './stat-tile.service';

@Injectable()
export class TileService {
  constructor(
    @InjectModel(Tile.name)
    private readonly tileModel: Model<TileDocument>,
    @InjectModel(StatTile.name)
    private readonly statTileModel: Model<TileDocument>,
    private readonly statTileService: StatTileService,
  ) {}

  async create(createTileDto: CreateStatTileDTO, url: string) {
    const { label, width, height, x, y, type, source } = createTileDto;

    const stat = new this.statTileModel({
      label,
      source,
    });

    await stat.save();

    const created = new this.tileModel({
      url,
      width,
      height,
      x,
      y,
      type,
      content: stat._id,
    });

    await created.save();

    return created;
  }

  async getAll(url: string) {
    return this.tileModel.find({ url }).populate('content');
  }

  async update(id: string, dto: UpdateTileDTO) {
    const found = await this.tileModel.findById(id);

    if (!found) throw new HttpException('Tile not found', HttpStatus.NOT_FOUND);

    const { x, y, width, height } = dto;

    found.x = x;
    found.y = y;
    found.width = width;
    found.height = height;

    return await found.save();
  }

  async delete(id: string) {
    const found = await this.tileModel.findById(id);

    if (!found) throw new HttpException('Tile not found', HttpStatus.NOT_FOUND);

    await this.statTileService.delete(found.content);

    await found.delete();
  }
}
