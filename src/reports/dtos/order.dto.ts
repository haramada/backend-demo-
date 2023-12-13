import { Order } from '../../entities/order.entity';

export class OrderDto {
  count: number;
  completedOrders: Order[];
}
