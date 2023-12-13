import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dish } from './dishe.entity';

@Entity()
export class DishType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dish_type: string;

  @OneToMany((type) => Dish, (dish) => dish.dish_type)
  dishes: Dish[];
}
