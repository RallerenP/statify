import { TileModule } from './../tile/tile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StatTileService } from './stat-tile.service';
import { forwardRef, Module } from '@nestjs/common';
import { StatTileController } from './stat-tile.controller';
import { StatTile, StatTileSchema } from '../tile/schemas/stat-tile.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
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
    forwardRef(() => TileModule),
  ],
  controllers: [StatTileController],
  providers: [StatTileService],
  exports: [StatTileService],
})
export class StatTileModule {}
