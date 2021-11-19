import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RandomService } from './random.service';

@Controller('random')
@ApiTags('Random')
export class RandomController {
  constructor(private readonly randomService: RandomService) {}

  /**
   * Get a random number
   */
  @Get()
  getRandom() {
    return {
      value: this.randomService.getRandom(),
      description: 'A random number',
    };
  }

  /**
   * Get 5 random numbers
   */
  @Get('/array')
  getRandomArray() {
    return {
      value: this.randomService.getRandomArray(),
      description: 'An array of random numbers',
    };
  }
}
