import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { OrderDto } from './dtos/order.dto';
import { DishQueryDto } from '../menu/dtos/dish-query.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/daily-revenue')
  async getCompletedOrdersByDate(
    @Query('date') date: string,
  ): Promise<OrderDto> {
    let checkDate = new Date();
    if (date) checkDate = new Date(date);

    const result =
      await this.reportsService.getCompletedOrdersForTheDay(checkDate);
    let orderRecords: OrderDto = {
      count: result.length,
      completedOrders: result,
    };

    return orderRecords;
  }

  @Get('/famous-dish')
  async getMostFamousDish(@Query(new ValidationPipe()) getQuery: DishQueryDto) {
    const result = await this.reportsService.getMostFamousDishByType(
      getQuery.type,
    );

    return result;
  }
}
