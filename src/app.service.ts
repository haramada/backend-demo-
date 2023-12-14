import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from './entities/dishe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(@InjectRepository(Dish) private dishRepo: Repository<Dish>) {}
  async onApplicationBootstrap() {
    const initDishes: Partial<Dish>[] = [
      { dishName: 'Rice', dishType: 'main', price: 100 },
      { dishName: 'Rotti', dishType: 'main', price: 20 },
      { dishName: 'Noodles', dishType: 'main', price: 150 },
      { dishName: 'Wadei', dishType: 'side', price: 45 },
      { dishName: 'Dhal Curry', dishType: 'side', price: 75 },
      { dishName: 'Fish Curry', dishType: 'side', price: 120 },
      { dishName: 'Watalappam', dishType: 'dessert', price: 40 },
      { dishName: 'Jelly', dishType: 'dessert', price: 20 },
      { dishName: 'Pudding', dishType: 'dessert', price: 25 },
    ];

    //write the master data
    let dishes = await this.dishRepo.find();
    if (dishes.length === 0) {
      initDishes.forEach(async (item) => {
        await this.dishRepo.save(item);
      });
    }
  }
}
