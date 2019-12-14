import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { InvoiceStatus } from './InvoiceStatusEnum';
import { Customer } from '../customers/customer.entity';
@Entity()
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invNo: string;

  // @Column()
  // totItems: number;

  // @Column()
  // totBTax: number;

  // @Column()
  // totTax: number;

  @Column()
  totAmt: number;

  // @Column()
  // totPaid: number;

  // @Column()
  // totBal: number;

  @Column()
  @ManyToOne(type => Customer, customer => customer.invoices, { eager: true })
  cusId: string;

  @Column()
  status: InvoiceStatus;

  // @Column()
  // invDt: string;

  // @Column()
  // createDt: string;

  @Column()
  createBy: number;

  // @Column()
  // updateDt: string;

  // @Column()
  // updateBy: string;
}
