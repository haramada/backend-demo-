import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from '../entities/dishe.entity';
import { Repository } from 'typeorm';
import { DishTypeConstants } from '../common/dish-types';

@Injectable()
export class MenuService {
  private menuConfig = {
    minNumMainDishes: 1,
    mindNumSideDishes: 1,
  };

  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
  ) {}

  getAllDishes(): Promise<Dish[]> {
    return this.dishRepository.find();
  }
  getDishesByType(dishType: DishTypeConstants) {
    return this.dishRepository.find({ where: { dishType: dishType } });
  }

  getMenuConfigRequirements() {
    return this.menuConfig;
  }
}
