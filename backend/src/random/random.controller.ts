import { Controller, Get } from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController {
  constructor(private readonly randomService: RandomService) {}

  @Get()
  getRandom() {
    return this.randomService.getRandom();
  }

  @Get('/array')
  getRandomArray() {
    return this.randomService.getRandomArray();
  }
}
