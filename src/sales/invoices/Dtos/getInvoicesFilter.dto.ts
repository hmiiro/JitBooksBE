import { InvoiceStatus } from '../InvoiceStatusEnum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetInvoicesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
  @IsOptional()
  @IsIn([
    InvoiceStatus.CREATED,
    InvoiceStatus.CANCELLED,
    InvoiceStatus.DELETED,
    InvoiceStatus.HELD,
    InvoiceStatus.PAID,
    InvoiceStatus.PARTIALLY_PAID,
  ])
  status: InvoiceStatus;
}
