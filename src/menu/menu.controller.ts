import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Dish } from '../entities/dishe.entity';
import { DishQueryDto } from './dtos/dish-query.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  async getDishesBasedOnType(@Param('dishType') dishType: string) {}

  @Get('/dishes')
  async getDishes(
    @Query(new ValidationPipe())
    dishQueryDto: DishQueryDto,
  ) {
    let dishes: Dish[];

    //query the dishes with a specific type
    if (dishQueryDto.type) {
      dishes = await this.menuService.getDishesByType(dishQueryDto.type);
    } else {
      dishes = await this.menuService.getAllDishes();
      console.log(dishes);
    }

    return dishes;
  }
}
