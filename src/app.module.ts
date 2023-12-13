import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dishe.entity';
import { Order } from './entities/order.entity';
import { MenuModule } from './menu/menu.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    OrdersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'test',
      username: 'root',
      password: 'admin',
      entities: [Dish, Order],
      synchronize: true,
    }),
    MenuModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
