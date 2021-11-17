import { TileDocument } from './../tile/schemas/tile.schema';
import { TileService } from '../tile/services/tile.service';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateStatTileDTO } from './dto/update-stat-tile.dto';
import { StatTile, StatTileDocument } from '../tile/schemas/stat-tile.schema';
import { CreateStatTileDTO } from './dto/create-stat-tile.dto';

@Injectable()
export class StatTileService {
  constructor(
    @InjectModel(StatTile.name)
    private readonly statTileModel: Model<StatTileDocument>,
    @Inject(forwardRef(() => TileService))
    private readonly tileService: TileService,
  ) {}

  async create(url: string, dto: CreateStatTileDTO) {
    const { label, source } = dto;

    const created = new this.statTileModel({
      label,
      source,
    });

    await created.save();

    const tile = await this.tileService.create(url, dto, created);

    created.parent = tile;

    await created.save();

    return tile;
  }

  async update(id: string, dto: UpdateStatTileDTO): Promise<StatTile> {
    const found = await this.statTileModel.findById(id);

    if (!found) throw new HttpException('Stat not found', HttpStatus.NOT_FOUND);

    await found.update(dto);
    await found.save();

    return found;
  }

  async delete(id: string) {
    const found = await this.statTileModel.findById(id);

    if (!found) throw new HttpException('Stat not found', HttpStatus.NOT_FOUND);

    const parent = found.parent;

    await found.delete();
    await this.tileService.delete(parent._id);
  }
}
