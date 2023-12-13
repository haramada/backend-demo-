import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from '../entities/dishe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
