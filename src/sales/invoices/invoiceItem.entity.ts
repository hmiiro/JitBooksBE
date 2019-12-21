import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { InvoiceStatus } from './InvoiceStatusEnum';
import { Invoice } from './invoice.entity';

@Entity('invoiceItems')
export class InvoiceItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invNo: string;

  @Column()
  itemCode: string;

  @Column()
  qty: number;

  @Column()
  itemPrice: number;

  @Column()
  taxRate: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createDt: string;

  @Column({
    default: 0,
  })
  createBy: number;
  @ManyToOne(type => Invoice, invoice => invoice.invoiceItems)
  invoiceItem: Invoice;
  // @Column()
  // updateDt: string;

  // @Column()
  // updateBy: string;
}
