import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateStatTileDTO } from '../dtos/UpdateStatTileDTO';
import { StatTile } from '../schemas/stat-tile.schema';
import { TileDocument } from '../schemas/tile.schema';

@Injectable()
export class StatTileService {
  constructor(
    @InjectModel(StatTile.name)
    private readonly statTileModel: Model<TileDocument>,
  ) {}

  async update(id: string, dto: UpdateStatTileDTO) {
    const found = await this.statTileModel.findById(id);

    if (!found) throw new HttpException('Stat not found', HttpStatus.NOT_FOUND);

    await found.update(dto);
    return await found.save();
  }

  async delete(id: string) {
    const found = await this.statTileModel.findById(id);

    if (!found) throw new HttpException('Stat not found', HttpStatus.NOT_FOUND);

    await found.delete();
  }
}
