import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CoronaController } from './corona.controller';
import { CoronaService } from './corona.service';

@Module({
  imports: [HttpModule],
  controllers: [CoronaController],
  providers: [CoronaService]
})
export class CoronaModule {}
