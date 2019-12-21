import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { InvoiceItem } from './invoiceItem.entity';
import { CreateInvoiceItemDto } from './Dtos/createInvoiceItem.dto';

@EntityRepository(InvoiceItem)
export class InvoiceItemRepository extends Repository<InvoiceItem> {
  //CREATE INVOICE
  async createInvoiceItem(
    createInvoiceItemDto: CreateInvoiceItemDto,
    user: User,
    invNo,
  ): Promise<InvoiceItem> {
    const { itemCode, qty, itemPrice, taxRate } = createInvoiceItemDto;

    const invoiceItem = new InvoiceItem();

    invoiceItem.invNo = invNo;
    invoiceItem.itemCode = itemCode;
    invoiceItem.qty = qty;
    invoiceItem.itemPrice = itemPrice;
    invoiceItem.taxRate = taxRate;
    invoiceItem.createBy = user.id;
    // invoice.updateDt = updateDt;
    // invoice.updateBy = updateBy;
    await invoiceItem.save();

    return invoiceItem;
  }

  // // GET INVOICES
  // async getInvoices(filtersDto: GetInvoicesFilterDto): Promise<Invoice[]> {
  //   const { search, status } = filtersDto;

  //   const query = this.createQueryBuilder('invoice');
  //   // if there is a status filter
  //   if (status) {
  //     query.andWhere('invoice.status = :status', { status });
  //   }
  //   // if there is a search text filter
  //   if (search) {
  //     query.andWhere(
  //       '(invoice.status LIKE :search OR invoice.status LIKE :search)',
  //       { search: `%${search}%` },
  //     );
  //   }

  //   const invoices = await query.getMany();

  //   return invoices;
  // }

  async genInvoiceNo() {
    const suffix = 'INV';
    const query = this.createQueryBuilder('invoice');
    const result = await query
      .select('invoice.invNo')
      .orderBy('invoice.invNo', 'DESC')
      .limit(1)
      .execute();
    try {
      if (result.length > 0) {
        const lastInvoiceNo = result[0].invoice_invNo;
        const trimmed = lastInvoiceNo.substring(3);
        const incremented = (parseInt(trimmed) + 1).toString();
        const newInvoiceNo = `${suffix}${incremented.padStart(6, '0')}`;
        return newInvoiceNo;
      } else {
        return `${suffix}000001`;
      }
    } catch (error) {}
  }
}
