import { Module } from '@nestjs/common';
import { TileService } from './tile.service';
import { TileController } from './tile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tile, TileSchema } from './schemas/tile.schema';
import { StatTile, StatTileSchema } from './schemas/stat-tile.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Tile.name,
        useFactory: () => {
          const schema = TileSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: StatTile.name,
        useFactory: () => {
          const schema = StatTileSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [TileController],
  providers: [TileService],
})
export class TileModule {}
