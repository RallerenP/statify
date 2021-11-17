import { UpdateTileDTO } from '../dtos/update-tile.dto';
import {
  Injectable,
  HttpException,
  HttpStatus,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tile, TileDocument } from '../schemas/tile.schema';
import { StatTile } from '../schemas/stat-tile.schema';
import { StatTileService } from '../../stat-tile/stat-tile.service';
import { CreateTileDTO } from '../dtos/create-tile-dto';

@Injectable()
export class TileService {
  constructor(
    @InjectModel(Tile.name)
    private readonly tileModel: Model<TileDocument>,
    @Inject(forwardRef(() => StatTileService))
    private readonly statTileService: StatTileService,
  ) {}

  async create(
    url: string,
    createTileDto: CreateTileDTO,
    content: { _id: string },
  ) {
    const { width, height, x, y, type } = createTileDto;

    const created = new this.tileModel({
      url,
      width,
      height,
      x,
      y,
      type,
      content: content._id,
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

    await found.delete();
  }
}
