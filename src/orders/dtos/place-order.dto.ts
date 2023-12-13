import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { DishDto } from '../../menu/dtos/dish.dto';
import { Type } from 'class-transformer';

export class PlaceOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DishDto)
  mainDishes: DishDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DishDto)
  sideDishes: DishDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DishDto)
  desserts?: DishDto[];
}
