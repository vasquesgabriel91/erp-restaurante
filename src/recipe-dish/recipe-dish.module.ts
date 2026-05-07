import { Module } from '@nestjs/common';
import { RecipeDishController } from './recipe-dish.controller';

@Module({
  controllers: [RecipeDishController],
})
export class RecipeDishModule {}
