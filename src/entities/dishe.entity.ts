import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'dish_name' })
  dishName: string;

  @Column()
  price: number;

  @Column({ name: 'dish_type' })
  dishType: string;

  @ManyToMany(() => Order)
  @JoinTable({ name: 'dish_orders' })
  orders: Order[];
}
