import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MenuItem } from './schemas/menu-item.schema';

@Controller('menu')
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenuItems(): Promise<MenuItem[]> {
    return this.menuService.getAll();
  }

  @Get('/:url(*)')
  getMenu(@Param('url') url: string) {
    return this.menuService.getOne(`/${url}`);
  }

  @Post('/:url(*)')
  createMenuItem(
    @Body() createMenuItemDto: CreateMenuItemDto,
    @Param('url') url: string,
  ) {
    return this.menuService.create(createMenuItemDto, `/${url}`);
  }

  @Delete('/:url(*)')
  deleteMenuItems(@Param('url') url: string) {
    return this.menuService.delete(`/${url}`);
  }
}
