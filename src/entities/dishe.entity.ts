import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
