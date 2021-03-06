import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { TileModule } from './tile/tile.module';
import { BitcoinModule } from './bitcoin/bitcoin.module';
import { RandomModule } from './random/random.module';
import { CoronaModule } from './corona/corona.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    HttpModule,
    MenuModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    TileModule,
    BitcoinModule,
    RandomModule,
    CoronaModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
