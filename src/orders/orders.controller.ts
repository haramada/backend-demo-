import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PlaceOrderDto } from './dtos/place-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  PlaceOrder(@Body(new ValidationPipe()) placeOrderDto: PlaceOrderDto) {
    return this.ordersService.placeAnOrder(placeOrderDto);
  }
}
