import { Repository, EntityRepository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './Dtos/createInvoice.dto';
import { InvoiceStatus } from './InvoiceStatusEnum';
import { GetInvoicesFilterDto } from './Dtos/getInvoicesFilter.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {
  //CREATE INVOICE
  async createInvoice(
    createInvoiceDto: CreateInvoiceDto,
    user: User,
  ): Promise<Invoice> {
    const {
      // totItems,
      // totBTax,
      // totTax,
      totAmt,
      // totPaid,
      // totBal,
      cusId,
      // invDt,
      // createDt,
      // updateDt,
      // updateBy,
    } = createInvoiceDto;

    const invoice = new Invoice();

    invoice.invNo = await this.genInvoiceNo();
    // invoice.totItems = totItems;
    // invoice.totBTax = totBTax;
    // invoice.totTax = totTax;
    invoice.totAmt = totAmt;
    // invoice.totPaid = totPaid;
    // invoice.totBal = totBal;
    invoice.cusId = cusId;
    // invoice.invDt = invDt;
    invoice.status = InvoiceStatus.CREATED;
    // invoice.createDt = createDt;
    invoice.createBy = user.id;
    // invoice.updateDt = updateDt;
    // invoice.updateBy = updateBy;
    await invoice.save();

    return invoice;
  }

  // GET INVOICES
  async getInvoices(filtersDto: GetInvoicesFilterDto): Promise<Invoice[]> {
    const { search, status } = filtersDto;

    const query = this.createQueryBuilder('invoice');
    // if there is a status filter
    if (status) {
      query.andWhere('invoice.status = :status', { status });
    }
    // if there is a search text filter
    if (search) {
      query.andWhere(
        '(invoice.status LIKE :search OR invoice.status LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const invoices = await query.getMany();

    return invoices;
  }

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
