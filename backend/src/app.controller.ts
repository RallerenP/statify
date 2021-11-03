import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getListOfSubscriptions();
  }

  @Get('/resources')
  resources() {
    return this.appService.getResources();
  }

  @Get('/metrics')
  metrics() {
    return this.appService.getResourceCost();
  }
}
