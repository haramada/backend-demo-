import { IsPositive } from 'class-validator';

export class DishDto {
  @IsPositive()
  id: number;
}
