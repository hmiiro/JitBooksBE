import { IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  // @IsNotEmpty()
  // totItems: number;

  // @IsNotEmpty()
  // totBTax: number;

  // @IsNotEmpty()
  // totTax: number;

  @IsNotEmpty()
  totAmt: number;

  // @IsNotEmpty()
  // totPaid: number;

  // @IsNotEmpty()
  // totBal: number;

  @IsNotEmpty()
  cusId: string;

  // @IsNotEmpty()
  // invDt: string;

  // @IsNotEmpty()
  // createDt: string;

  // @IsNotEmpty()
  // updateDt: string;

  // @IsNotEmpty()
  // updateBy: string;
}
