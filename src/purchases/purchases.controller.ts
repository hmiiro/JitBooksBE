import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ItemStatus } from './items/ItemStatusEnum';
import { CreateItemDto } from './items/createItem.dto';
import { Item } from './items/item.entity';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';
import { PurchasesService } from './purchases.service';

// Set authorisation to the controller
@UseGuards(AuthGuard())
@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  //#region *********ITEMS***************

  // CREATE ITEM
  @Post('/items')
  @UsePipes(ValidationPipe)
  createItem(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.purchasesService.createItem(createItemDto, user);
  }

  //GET ITEMS
  @Get('/items')
  getItems(): Promise<Item[]> {
    return this.purchasesService.getItems();
  }

  //GET TEST CREATE CODE
  @Get('/items/test')
  genItemNo() {
    return this.purchasesService.genItemNo();
  }

  //   //GET ONE ITEM BY ITEMNO
  //   @Get('/items/:id')
  //   getItemByItemNo(@Param('id', ParseIntPipe) id: number): Promise<Item> {
  //     return this.purchasesService.getItemByItemNo(id);
  //   }

  //   //UPDATE ITEM STATUS
  //   @Patch('/items/:id/status')
  //   updateItemStatus(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body('status') status: ItemStatus,
  //   ): Promise<Item> {
  //     return this.purchasesService.updateItemStatus(id, status);
  //   }

  //   //DELETE ONE ITEM BY ITEMNO
  //   @Delete('/items/:id')
  //   deleteItemByItemNo(@Param('id', ParseIntPipe) id: number): Promise<void> {
  //     return this.purchasesService.deleteItemByItemNo(id);
  //   }
  //#endregion
}
