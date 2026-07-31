import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesUseCase } from './useCase/categories.use.cases';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesRepository } from './repository/categories.repository';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesUseCase, CategoriesRepository, PrismaService],
  exports: [CategoriesRepository],
})
export class CategoriesModule {}
