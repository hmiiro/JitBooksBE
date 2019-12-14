import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { InvoiceRepository } from './invoices/invoice.repository';
import { AuthModule } from '../auth/auth.module';
import { CustomerRepository } from './customers/customer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceRepository, CustomerRepository]),
    AuthModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
