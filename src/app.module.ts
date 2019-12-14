import { Module } from '@nestjs/common';
import { SalesModule } from './sales/sales.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AccountingModule } from './accounting/accounting.module';
import { BankingModule } from './banking/banking.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SalesModule,
    AuthModule,
    AccountingModule,
    BankingModule,
    PurchasesModule,
  ],
})
export class AppModule {}
