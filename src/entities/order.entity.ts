import {
  Column,
  CreateDateColumn,
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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column()
  totalPrice: number;

  @ManyToMany(() => Dish)
  @JoinTable({ name: 'dish_orders' })
  dishes: Dish[];
}
