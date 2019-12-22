import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceStatus } from './invoices/InvoiceStatusEnum';
import { CreateInvoiceDto } from './invoices/Dtos/createInvoice.dto';
import { GetInvoicesFilterDto } from './invoices/Dtos/getInvoicesFilter.dto';
import { InvoiceRepository } from './invoices/invoice.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './invoices/invoice.entity';
import { CustomerRepository } from './customers/customer.repository';
import { Customer } from './customers/customer.entity';
import { CreateCustomerDto } from './customers/create-customer.dto';
import { User } from '../auth/user.entity';
import { CreateInvoiceItemDto } from './invoices/Dtos/createInvoiceItem.dto';
import LineItemsDto from './invoices/Dtos/lineItems.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(InvoiceRepository)
    private invoiceRepository: InvoiceRepository,

    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,
  ) {}
  //#region *********CUSTOMERS***************

  // GET CUSTOMERS
  async getCustomers(): Promise<Customer[]> {
    return await this.customerRepository.getCustomers();
  }
  // GET ONE CUSTOMER
  async getCustomerById(id: number): Promise<Customer> {
    const found = await this.customerRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Customer with ${id} not found!`);
    }
    return found;
  }
  // CREATE CUSTOMERS
  async createCustomer(createCustomerDto: CreateCustomerDto, user: User) {
    return await this.customerRepository.createCustomer(
      createCustomerDto,
      user,
    );
  }
  //#endregion

  //#region *********INVOICES***************
  //CREATE INVOICE
  createInvoice(
    createInvoiceDto: CreateInvoiceDto,
    user: User,
    lineItems: LineItemsDto,
    //createInvoiceItemDto: CreateInvoiceItemDto,
  ): Promise<Invoice> {
    return this.invoiceRepository.createInvoice(
      createInvoiceDto,
      user,
      //createInvoiceItemDto,
      lineItems,
    );
  }
  //GET ALL INVOICES
  getInvoices(filterDto: GetInvoicesFilterDto): Promise<Invoice[]> {
    return this.invoiceRepository.getInvoices(filterDto);
  }

  //GET INVOICE NO.
  genInvoiceNo() {
    return this.invoiceRepository.genInvoiceNo();
  }
  //GET AN INVOICE BY INVOICENO
  async getInvoiceByInvNo(id: number): Promise<Invoice> {
    // 1st get the invoice and store it in found
    const found = await this.invoiceRepository.findOne(id);
    //thow error if invoice is not found.
    if (!found) {
      throw new NotFoundException(`Invoice with ID:${id} was not found`);
    }
    return found;
  }

  //UPDATE INVOICE STATUS
  async updateInvoiceStatus(
    id: number,
    status: InvoiceStatus,
  ): Promise<Invoice> {
    // first fetch the invoice using the invNo
    const invoice = await this.getInvoiceByInvNo(id);
    //then set the status
    invoice.status = status;
    await invoice.save();
    return invoice;
  }

  //DELETE AN INVOICE BY INVOICENO
  async deleteInvoiceByInvNo(id: number): Promise<void> {
    const result = await this.invoiceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Invoice with ID:${id} was not found`);
    }
  }
  //#endregion
}
