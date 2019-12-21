import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from './items/item.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './items/createItem.dto';
import { User } from 'src/auth/user.entity';
import { Item } from './items/item.entity';
import { ItemStatus } from './items/itemStatusEnum';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}
  //#region *********ITEMS***************
  //CREATE ITEM
  createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return this.itemRepository.createItem(createItemDto, user);
  }
  //GET ALL ITEMS
  getItems(): Promise<Item[]> {
    return this.itemRepository.getItems();
  }

  //GET ITEM NO.
  genItemNo() {
    return this.itemRepository.genItemNo();
  }
  //GET AN ITEM BY ITEMCODE
  async getItemByItemNo(id: number): Promise<Item> {
    // 1st get the item and store it in found
    const found = await this.itemRepository.findOne(id);
    //thow error if item is not found.
    if (!found) {
      throw new NotFoundException(`Item with ID:${id} was not found`);
    }
    return found;
  }

  //UPDATE ITEM STATUS
  async updateItemStatus(id: number, status: ItemStatus): Promise<Item> {
    // first fetch the item using the invNo
    const item = await this.getItemByItemNo(id);
    //then set the status
    item.status = status;
    await item.save();
    return item;
  }

  //DELETE AN ITEM BY ITEMCODE
  async deleteItemByItemNo(id: number): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID:${id} was not found`);
    }
  }
  //#endregion
}
