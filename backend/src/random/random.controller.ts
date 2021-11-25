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

  /**
   * Get a random list of random labels & numbers, used for certain charts
   */
  @Get('/simpleChart')
  getLabelsAndNumbers() {
    return {
      value: this.randomService.getLabelsAndNumbers(),
      description: 'An object of an array with random labels, and an array of random numbers',
    };
  }

  @Get('/advancedChart')
  getRandomScatterPoints() {
    return {
      value: this.randomService.getRandomScatterPoints(),
      description: 'An array of random scatter points objects',
    }
  }

  @Get('/onOff')
  getRandomOnOff() {
    return {
      value: this.randomService.getRandomOnOff(),
      description: 'Show whether a service is offline or online'
    };
  }

}
