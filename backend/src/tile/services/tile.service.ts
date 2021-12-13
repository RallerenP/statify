import { UpdateTileDTO } from '../dtos/update-tile.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tile, TileDocument } from '../schemas/tile.schema';
import { CreateTileDTO } from '../dtos/create-tile-dto';

@Injectable()
export class TileService {
  constructor(
    @InjectModel(Tile.name)
    private readonly tileModel: Model<TileDocument>,
  ) {}

  async create(url: string, dto: CreateTileDTO) {
    const { width, height, x, y, content, link } = dto;

    const created = new this.tileModel({
      url,
      width,
      height,
      x,
      y,
      content,
      link
    });

    await created.save();

    return created;
  }

  async getAll(url: string) {
    return this.tileModel.find({ url });
  }

  async update(id: string, dto: UpdateTileDTO) {
    const found = await this.tileModel.findById(id);

    if (!found) throw new HttpException('Tile not found', HttpStatus.NOT_FOUND);

    const { x, y, width, height, content } = dto;

    if (x !== undefined) found.x = x;
    if (y !== undefined) found.y = y;
    if (width !== undefined) found.width = width;
    if (height !== undefined) found.height = height;
    if (content !== undefined) found.content = content;

    return await found.save();
  }

  async delete(id: string) {
    const found = await this.tileModel.findById(id);

    if (!found) throw new HttpException('Tile not found', HttpStatus.NOT_FOUND);

    await found.delete();
  }
}
