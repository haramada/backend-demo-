import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Dish } from '../entities/dishe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Dish])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
