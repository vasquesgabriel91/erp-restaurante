import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository/ProductRepository';
import { ProductUseCase } from './useCases/ProductUseCase';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [ProductController],
  providers: [ProductUseCase, ProductRepository, PrismaService],
  exports: [ProductRepository],
})
export class ProductModule {}
