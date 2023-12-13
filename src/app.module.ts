import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishType } from './entities/dish-type.entity';

@Module({
  imports: [
    OrdersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      entities: [DishType],
      synchronize: true,
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class AppModule {}
