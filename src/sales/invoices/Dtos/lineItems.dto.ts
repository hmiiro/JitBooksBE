import { ValidateNested } from 'class-validator';
import { CreateInvoiceItemDto } from './createInvoiceItem.dto';

export default class LineItemsDto {
  @ValidateNested({ each: true })
  public items: CreateInvoiceItemDto[];
}
