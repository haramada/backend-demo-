import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dish_name: string;

  @Column()
  price: number;

  @Column()
  dish_type: string;
}
