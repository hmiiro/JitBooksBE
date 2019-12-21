import { Repository, EntityRepository } from 'typeorm';

import { Item } from './item.entity';
import { User } from 'src/auth/user.entity';
import { CreateItemDto } from './createItem.dto';
import { ItemStatus } from './itemStatusEnum';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  //CREATE Item
  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const {
      itemName,
      itemDesc,
      itemType,
      costPrice,
      salesPrice,
      taxable,
    } = createItemDto;

    const item = new Item();

    item.itemCode = this.genItemNo();
    item.itemName = itemName;
    item.itemDesc = itemDesc;
    item.salesPrice = salesPrice;
    item.status = ItemStatus.ACTIVE;

    item.createBy = user.id;
    // item.updateDt = updateDt;
    // item.updateBy = updateBy;
    await item.save();

    return item;
  }

  // GET INVOICES
  async getItems(): Promise<Item[]> {
    const query = this.createQueryBuilder('item');

    const items = await query.getMany();

    return items;
  }

  genItemNo() {
    const suffix = 'IT';
    const code = Math.floor(Math.random() * 10000);
    console.log(code);
    return `${suffix}${code}`;
  }
}
