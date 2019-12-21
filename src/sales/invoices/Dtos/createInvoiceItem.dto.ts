import { IsNotEmpty } from 'class-validator';

export class CreateInvoiceItemDto {
  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  itemName: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  itemPrice: number;

  @IsNotEmpty()
  taxRate: number;
}
