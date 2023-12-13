import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { endOfDay, startOfDay } from 'date-fns';
import { DishTypeConstants } from '../common/dish-types';
import { Dish } from '../entities/dishe.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
  ) {}

  getCompletedOrdersForTheDay(date: Date) {
    const start = startOfDay(date).toISOString();
    const end = endOfDay(date).toISOString();

    const result = this.orderRepository
      .createQueryBuilder('order')
      .where('order.orderDate BETWEEN :start AND :end', { start, end })
      .getMany();

    return result;
  }

  async getMostFamousDishByType(dishType: DishTypeConstants): Promise<Dish> {
    const result = await this.dishRepository
      .createQueryBuilder('dish')
      .leftJoinAndSelect('dish.orders', 'order')
      .where('dish.dish_type = :dishType', { dishType })
      .select('COUNT(order.id) , dish.id')
      .groupBy('dish.id')
      .getRawMany();

    const { id } = result[0];
    return this.dishRepository.findOne({ where: { id } });
  }
}
