import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Gen_Seq extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  suffix: string;

  @Column()
  nextSq: number;
}
