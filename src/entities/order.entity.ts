import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dish } from './dishe.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @ManyToMany(() => Dish)
  @JoinTable({ name: 'dish_orders' })
  dishes: Dish[];
}
