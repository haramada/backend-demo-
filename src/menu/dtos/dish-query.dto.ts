import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';
import { DishTypeConstants } from '../../common/dish-types';

export class DishQueryDto {
  @IsOptional()
  @IsEnum(DishTypeConstants)
  type?: DishTypeConstants;
}
