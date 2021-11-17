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
  getRandom(): number {
    return this.randomService.getRandom();
  }

  /**
   * Get 5 random numbers
   */
  @Get('/array')
  getRandomArray(): number[] {
    return this.randomService.getRandomArray();
  }
}
