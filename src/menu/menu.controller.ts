import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
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
    dishQueryDto: DishQueryDto, //validation of the dishtype query param
  ) {
    let dishes: Dish[];

    //query the dishes with a specific type
    if (dishQueryDto.type) {
      dishes = await this.menuService.getDishesByType(dishQueryDto.type);
    } else {
      dishes = await this.menuService.getAllDishes();
    }

    return dishes;
  }

  @Get('/config')
  getMenuConfigRequirements() {
    return this.menuService.getMenuConfigRequirements();
  }
}
