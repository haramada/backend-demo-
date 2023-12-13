import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { In, Repository } from 'typeorm';
import { PlaceOrderDto } from './dtos/place-order.dto';
import { InvalidOrderException } from '../common/exceptions/invalid-order.exception';
import { Dish } from '../entities/dishe.entity';
import { DishTypeConstants } from '../common/dish-types';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
  ) {}

  async placeAnOrder({ mainDishes, sideDishes, desserts }: PlaceOrderDto) {
    //check if there is atleast one main dish included
    if (mainDishes.length === 0)
      throw new InvalidOrderException('atleat one main dish should be ordered');

    //check whether there is atleast 1 side dish included
    if (sideDishes.length === 0)
      throw new InvalidOrderException('atleast one side should be ordered');

    //verify the recieved dish data with the persisted data
    const mainDishIds = mainDishes.map((item) => item.id);
    let result = await this.checkDishIdsByType(
      mainDishIds,
      DishTypeConstants.MAIN_DISHES,
    );
    if (mainDishIds.length !== result.length)
      throw new InvalidOrderException('invalid main dish ids found');

    const sideDishIds = sideDishes.map((item) => item.id);
    result = await this.checkDishIdsByType(
      sideDishIds,
      DishTypeConstants.SIDE_DISHES,
    );

    if (sideDishIds.length !== result.length)
      throw new InvalidOrderException('invalid side dish ids found');

    let dessertIds: number[] = [];
    if (desserts) {
      dessertIds = desserts.map((item) => item.id);
      result = await this.checkDishIdsByType(
        dessertIds,
        DishTypeConstants.DESSERTS,
      );
      if (dessertIds.length !== result.length)
        throw new InvalidOrderException('invlaid dessert dish ids found');
    }

    //for performance reason we can directly retrive the computed some for the price
    let ids = mainDishIds.concat(sideDishIds).concat(dessertIds);

    const totalPrice = await this.getComputedTotal(ids);

    //final bill computation is done, proceed to create the record
    this.orderRepository.insert({ totalPrice });
  }

  private async checkDishIdsByType(
    ids: number[],
    dishType: string,
  ): Promise<Dish[]> {
    return this.dishRepository
      .createQueryBuilder('dish')
      .where('dish.id IN (:...ids)', { ids })
      .andWhere('dish.dish_type = (:dishType)', { dishType: dishType })
      .getMany();
  }

  private async getComputedTotal(ids: number[]): Promise<number> {
    const result = await this.dishRepository
      .createQueryBuilder('dish')
      .where('dish.id IN (:...ids)', { ids: ids })
      .select('SUM(dish.price)', 'total')
      .getRawOne();

    const { total } = result;

    return total;
  }
}
