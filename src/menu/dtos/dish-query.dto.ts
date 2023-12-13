import { IsEnum, IsOptional } from 'class-validator';
import { DishTypeConstants } from '../../common/dish-types';

export class DishQueryDto {
  @IsOptional()
  @IsEnum(DishTypeConstants)
  type?: DishTypeConstants;
}
