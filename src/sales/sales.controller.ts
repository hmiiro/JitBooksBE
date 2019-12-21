import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SalesService } from './sales.service';
import { InvoiceStatus } from './invoices/InvoiceStatusEnum';
import { CreateInvoiceDto } from './invoices/Dtos/createInvoice.dto';
import { GetInvoicesFilterDto } from './invoices/Dtos/getInvoicesFilter.dto';
import { InvoiceStatusValidationPipe } from './invoices/pipes/InvoiceStatusValidation.pipe';
import { Invoice } from './invoices/invoice.entity';
import { Customer } from './customers/customer.entity';
import { CreateCustomerDto } from './customers/create-customer.dto';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';
import { CreateInvoiceItemDto } from './invoices/Dtos/createInvoiceItem.dto';

@Controller('sales')
// Set authorisation to the controller
@UseGuards(AuthGuard())
export class SalesController {
  constructor(private salesService: SalesService) {}

  //#region *********CUSTOMERS***************

  // CREATE CUSTOMERS
  @Post('/customers')
  @UsePipes(ValidationPipe)
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @GetUser() user: User,
  ) {
    return this.salesService.createCustomer(createCustomerDto, user);
  }

  // GET CUSTOMERS
  @Get('/customers')
  getCustomers(): Promise<Customer[]> {
    return this.salesService.getCustomers();
  }
  // GET ONE CUSTOMER
  @Get('/customers/:id')
  getCustomerById(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.salesService.getCustomerById(id);
  }

  //#endregion

  //#region *********INVOICES***************

  // CREATE INVOICE
  @Post('/invoices')
  @UsePipes(ValidationPipe)
  createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Body() createInvoiceItemDto: CreateInvoiceItemDto,
    @GetUser() user: User,
  ): Promise<Invoice> {
    //console.log(createInvoiceItemDto);
    return this.salesService.createInvoice(
      createInvoiceDto,
      user,
      createInvoiceItemDto,
    );
  }

  //GET INVOICES
  @Get('/invoices')
  getInvoices(
    @Query(ValidationPipe) filterDto: GetInvoicesFilterDto,
  ): Promise<Invoice[]> {
    return this.salesService.getInvoices(filterDto);
  }

  //GET INVOICES
  @Get('/invoices/test')
  genInvoiceNo() {
    return this.salesService.genInvoiceNo();
  }

  //GET ONE INVOICE BY INVOICENO
  @Get('/invoices/:id')
  getInvoiceByInvNo(@Param('id', ParseIntPipe) id: number): Promise<Invoice> {
    return this.salesService.getInvoiceByInvNo(id);
  }

  //UPDATE INVOICE STATUS
  @Patch('/invoices/:id/status')
  updateInvoiceStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', InvoiceStatusValidationPipe) status: InvoiceStatus,
  ): Promise<Invoice> {
    return this.salesService.updateInvoiceStatus(id, status);
  }

  //DELETE ONE INVOICE BY INVOICENO
  @Delete('/invoices/:id')
  deleteInvoiceByInvNo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.salesService.deleteInvoiceByInvNo(id);
  }
  //#endregion
}
