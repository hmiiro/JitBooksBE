import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('invoiceItems')
export class InvoiceItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invNo: string;

  @Column()
  itemCode: string;

  @Column({
    type: 'double',
  })
  qty: number;

  @Column({
    type: 'double',
  })
  itemPrice: number;

  @Column({
    type: 'double',
  })
  taxRate: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createDt: string;

  @Column()
  createBy: number;

  // @ManyToOne(type => Invoice, invoice => invoice.invoiceItems)
  // invoiceItem: Invoice;
  // @Column()
  // updateDt: string;

  // @Column()
  // updateBy: string;
}
