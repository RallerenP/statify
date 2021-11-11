import { Module } from '@nestjs/common';
import { TileService } from './services/tile.service';
import { TileController, StatTileController } from './tile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tile, TileSchema } from './schemas/tile.schema';
import { StatTile, StatTileSchema } from './schemas/stat-tile.schema';
import { StatTileService } from './services/stat-tile.service';

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
  controllers: [TileController, StatTileController],
  providers: [TileService, StatTileService],
})
export class TileModule {}
