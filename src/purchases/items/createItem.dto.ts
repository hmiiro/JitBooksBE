import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  itemName: string;
  itemDesc: string;
  itemType: string;
  costPrice: number;
  salesPrice: number;
  taxable: boolean;

  // @IsNotEmpty()
  // updateDt: string;
  // @IsNotEmpty()
  // updateBy: string;
}
