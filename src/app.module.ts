import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dishe.entity';
import { Order } from './entities/order.entity';
import { MenuModule } from './menu/menu.module';

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
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class AppModule {}
