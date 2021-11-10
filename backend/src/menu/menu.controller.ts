import { CreateMenuItemDto } from './dtos/CreateMenuDto';
import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Request } from 'express';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenuItems() {
    return this.menuService.getAll();
  }

  @Get('/*')
  getMenu(@Req() request: Request) {
    const url = request.url.substring(5);

    return this.menuService.getOne(url);
  }

  @Post('/*')
  createMenuItem(
    @Body() createMenuItemDto: CreateMenuItemDto,
    @Req() request: Request,
  ) {
    // URL /cool-menuitem/asdfg/
    const url = request.url.substring(5);

    return this.menuService.create(createMenuItemDto, url);
  }

  @Delete('/*')
  deleteMenuItems(@Req() request: Request) {
    const url = request.url.substring(5);

    return this.menuService.delete(url);
  }
}
