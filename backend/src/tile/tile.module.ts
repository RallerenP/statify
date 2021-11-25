import { Module } from '@nestjs/common';
import { TileService } from './services/tile.service';
import { TileController } from './tile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tile, TileSchema } from './schemas/tile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tile.name, schema: TileSchema }]),
  ],
  controllers: [TileController],
  providers: [TileService],
  exports: [TileService],
})
export class TileModule {}
