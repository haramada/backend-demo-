import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Dish } from '../entities/dishe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Dish])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
