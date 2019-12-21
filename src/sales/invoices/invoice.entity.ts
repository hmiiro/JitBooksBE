import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  JoinTable,
} from 'typeorm';
import { InvoiceStatus } from './InvoiceStatusEnum';
import { Customer } from '../customers/customer.entity';
import { InvoiceItem } from './invoiceItem.entity';
@Entity()
export class Invoice extends BaseEntity {
  @PrimaryColumn()
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
  cusId: string;

  @Column()
  status: InvoiceStatus;

  // @Column()
  // invDt: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createDt: string;

  @Column({
    default: 0,
  })
  createBy: number;

  // @Column()
  // updateDt: string;

  // @Column()
  // updateBy: string;
  @OneToMany(type => InvoiceItem, invoiceItem => invoiceItem.invNo, {
    eager: true,
  })
  @JoinTable()
  invoiceItems: InvoiceItem[];
}
