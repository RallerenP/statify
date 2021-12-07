import { DataSourceDTO } from './../datasource.dto';
import { TileTypes } from '../tile/schemas/tile.schema'
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
  getRandom(): DataSourceDTO {
    return {
      value: this.randomService.getRandom(),
      description: 'A random number',
      compatible: [TileTypes.Number]
    };
  }

  /**
   * Get a random list of random labels & numbers, used for certain charts
   */
  @Get('/simpleChart')
  getLabelsAndNumbers(): DataSourceDTO {
    return {
      value: this.randomService.getLabelsAndNumbers(),
      description: 'An object of an array with random labels, and an array of random numbers',
      compatible: [ TileTypes.BarChart, TileTypes.LineChart, TileTypes.PieChart ]
    };
  }

  @Get('/advancedChart')
  getRandomScatterPoints(): DataSourceDTO {
    return {
      value: this.randomService.getRandomScatterPoints(),
      description: 'An array of random scatter points objects',
      compatible: [ TileTypes.ScatterChart ]
    }
  }

  @Get('/onOff')
  getRandomOnOff(): DataSourceDTO {
    return {
      value: this.randomService.getRandomOnOff(),
      description: 'Show whether a service is offline or online',
      compatible: [ TileTypes.OnOff ]
    };
  }

  @Get('/ui')
  getUi(): DataSourceDTO {
    return {
      value: -1,
      description: 'A very descriptive description',
      compatible: [ TileTypes.Divider, TileTypes.Header, TileTypes.Description ]
    }
  }

}
