import { IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  cusId: string;

  // @IsNotEmpty()
  // invDt: string;
}
