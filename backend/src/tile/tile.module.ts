import { StatTileModule } from './../stat-tile/stat-tile.module';
import { forwardRef, Module } from '@nestjs/common';
import { TileService } from './services/tile.service';
import { TileController } from './tile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tile, TileSchema } from './schemas/tile.schema';
import { StatTile, StatTileSchema } from './schemas/stat-tile.schema';
import { StatTileService } from '../stat-tile/stat-tile.service';

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
    ]),
    forwardRef(() => StatTileModule),
  ],
  controllers: [TileController],
  providers: [TileService],
  exports: [TileService],
})
export class TileModule {}
