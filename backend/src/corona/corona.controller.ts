import { CoronaService } from './corona.service';
import { Controller, Get } from '@nestjs/common';
import { DataSourceDTO } from '../datasource.dto';
import { TileTypes } from '../tile/schemas/tile.schema';

@Controller('corona')
export class CoronaController {
  constructor(private readonly coronaService: CoronaService) {}

  @Get('getAllCases')
  async getAllHistorialCases(): Promise<DataSourceDTO> {
    return {
      value: await this.coronaService.getAllHistoricalCases(),
      description: 'Historical data for Covid Cases in Denmark',
      compatible: [TileTypes.BarChart]
    };
  }

  @Get('getTodayCases')
  async getTodayCases(): Promise<DataSourceDTO> {
    return {
      value: await this.coronaService.getTodayCases(),
      description: 'Covid cases today in Denmark',
      compatible: [TileTypes.Number]
    };
  }

  @Get('getAllDeaths')
  async getAllHistoricalDeaths(): Promise<DataSourceDTO> {
    return {
      value: await this.coronaService.getAllHistoricalDeaths(),
      description: 'Historical data for Covid Deaths in Denmark',
      compatible: [TileTypes.BarChart]
    };
  }

  @Get('getDeathsToday')
  async getDeathsToday(): Promise<DataSourceDTO> {
    return {
      value: await this.coronaService.getDeathsToday(),
      description: 'Covid Deaths today in Denmark',
      compatible: [TileTypes.Number]
    };
  }

}
