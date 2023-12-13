import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Dish } from '../entities/dishe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
