import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductUseCase } from './useCases/ProductUseCase';
import { CreateProductDto } from './dto/CreateProductDto';

@Controller('product')
export class ProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    return this.createProductUseCase.execute(body);
  }
}
