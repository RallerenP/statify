import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { MenuItemDocument, MenuItem } from './schemas/menu-item.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuItem.name)
    private readonly menuItemModel: Model<MenuItemDocument>,
  ) {}

  async create(createMenuItemDTO: CreateMenuItemDto, parentUrl?: string) {
    const { label } = createMenuItemDTO;

    if (parentUrl === '/') {
      const found = await this.menuItemModel.findOne({ label }).exec();

      if (found)
        throw new HttpException('Duplicate MenuItem', HttpStatus.CONFLICT);

      // TODO: Properly create url
      const created = new this.menuItemModel({
        label,
        url: `/${label.toLowerCase().replace(/ /g, '-')}`,
        top: true,
      });

      return created.save();
    } else {
      const parent = await this.menuItemModel.findOne({ url: parentUrl });

      if (!parent) {
        throw new HttpException(
          'Parent MenuItem not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const url = parent.url + `/${label.toLowerCase().replace(/ /g, '-')}`;

      const found = await this.menuItemModel.findOne({ url }).exec();

      if (found)
        throw new HttpException('Duplicate MenuItem', HttpStatus.CONFLICT);

      const created = new this.menuItemModel({
        label,
        url,
      });

      await created.save();

      parent.children.push(created);

      await parent.save();

      return created;
    }
  }

  async getAll() {
    const found = await this.menuItemModel.find({ top: true });

    return found || [];
  }

  async getOne(url: string) {
    const found = await this.menuItemModel.findOne({ url });

    if (!found) throw new HttpException('Menu not found', HttpStatus.NOT_FOUND);

    return found;
  }

  async delete(url: string) {
    const recursive = async (id: string) => {
      const child = await this.menuItemModel.findById(id);

      const delete_promises = child.children.map((child) =>
        recursive(child._id),
      );

      await Promise.all(delete_promises);

      await child.remove();
    };

    const found = await this.menuItemModel.findOne({ url });

    if (!found)
      throw new HttpException('MenuItem not found', HttpStatus.NOT_FOUND);

    await recursive(found._id);
  }
}
