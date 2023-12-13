import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DishType } from './dish-type.entity';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dish_name: string;

  @Column()
  price: number;

  @ManyToOne((type) => DishType, (dishType) => dishType.dishes)
  dish_type: DishType;
}
