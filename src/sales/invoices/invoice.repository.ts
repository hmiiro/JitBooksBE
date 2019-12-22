import { Repository, getCustomRepository, EntityRepository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './Dtos/createInvoice.dto';
import { InvoiceStatus } from './InvoiceStatusEnum';
import { GetInvoicesFilterDto } from './Dtos/getInvoicesFilter.dto';
import { User } from 'src/auth/user.entity';
import { CreateInvoiceItemDto } from './Dtos/createInvoiceItem.dto';
import { InvoiceItemRepository } from './invoiceItem.repository';
import LineItemsDto from './Dtos/lineItems.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {
  //CREATE INVOICE
  async createInvoice(
    createInvoiceDto: CreateInvoiceDto,
    user: User,
    lineItems: LineItemsDto,
    //createInvoiceItemDto: CreateInvoiceItemDto,
  ): Promise<Invoice> {
    const {
      // totItems,
      // totBTax,
      // totTax,
      //totAmt,
      // totPaid,
      // totBal,
      cusId,
      // invDt,
      // updateDt,
      // updateBy,
    } = createInvoiceDto;

    const invoice = new Invoice();

    try {
      invoice.invNo = await this.genInvoiceNo();
      // changing the sent invoice items to an "items" array
      const newItems = JSON.stringify(lineItems);
      const items = JSON.parse(newItems);

      // LOOP THRU TO CREATE INVOICE ITEMS FOR EACH ITEM IN THE "items" array
      items.map(async item => {
        const invNo = invoice.invNo;
        // injecting invoice items repo to use it
        const itemsRepository = getCustomRepository(InvoiceItemRepository);
        // call the repo create item method here and give the looped item, user & Invoice No.
        await itemsRepository.createInvoiceItem(item, user, invNo);
      });
      // MAKING SURE WE ONLY SAVE AN INVOICE IF IT HAS ITEMS
      if (items.length <= 0) {
        throw new InternalServerErrorException(
          `Error creating invoice, no items`,
        );
      } else {
        // NOW GENERATE INVOICE DETAILS USING ITEMS ARRAY
        const calcLineItemsTotal = () => {
          return items.reduce((prev, cur) => prev + cur.qty * cur.itemPrice, 0);
        };

        const calcTaxTotal = () => {
          return items.reduce(
            (prev, cur) => prev + cur.qty * cur.itemPrice * cur.taxRate,
            0,
          );
        };

        const calcGrandTotal = () => {
          return calcLineItemsTotal() + calcTaxTotal();
        };

        invoice.totItems = items.length;
        invoice.totBTax = calcLineItemsTotal();
        invoice.totTax = calcTaxTotal();
        invoice.totAmt = calcGrandTotal();
        // invoice.totPaid = totPaid;
        // invoice.totBal = totBal;
        invoice.cusId = cusId;
        // invoice.invDt = invDt;
        invoice.status = InvoiceStatus.CREATED;

        invoice.createBy = user.id;
        // invoice.updateDt = updateDt;
        // invoice.updateBy = updateBy;
        await invoice.save();

        return invoice;
      }
    } catch (error) {
      return error;
    }
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
