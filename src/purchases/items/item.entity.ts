import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ItemStatus } from './itemStatusEnum';
import { InvoiceItem } from '../../sales/invoices/invoiceItem.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  itemCode: string;

  @Column({
    unique: false,
  })
  itemName: string;

  @Column({
    nullable: true,
  })
  itemDesc: string;

  @Column({
    nullable: true,
    default: null,
  })
  itemType: string;

  @Column({
    nullable: true,
    default: 0,
  })
  costPrice: number;

  @Column({
    nullable: true,
    default: 0,
  })
  salesPrice: number;

  @Column({
    default: false,
  })
  taxable: boolean;

  @Column()
  status: ItemStatus;

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
  @OneToMany(type => InvoiceItem, item => item.itemCode, { eager: false })
  items: InvoiceItem[];
}
