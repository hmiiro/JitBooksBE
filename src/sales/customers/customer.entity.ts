import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Invoice } from '../invoices/invoice.entity';
import { IsEmpty } from 'class-validator';

@Entity()
@Unique(['name'])
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  tin: string;

  @Column({ nullable: true })
  phoneNo: string;

  @Column({ nullable: true })
  lastPassword: string;

  @Column()
  status: CustomerStatus;

  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  createDt: string;

  @Column({ nullable: true })
  updateBy: number;

  @Column({ nullable: true })
  updateDt: string;

  @OneToMany(type => Invoice, invoice => invoice.cusId, { eager: false })
  invoices: Invoice[];
}

export enum CustomerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
