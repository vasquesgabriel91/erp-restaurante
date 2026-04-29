import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductUseCase } from './useCases/ProductUseCase';
import { CreateProductDto } from './dto/CreateProductDto';

@Controller('product')
export class ProductController {
  constructor(private ProductUseCase: ProductUseCase) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    return this.ProductUseCase.execute(body);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.ProductUseCase.getById(id);
  }

  @Get()
  async getAll() {
    return this.ProductUseCase.getAll();
  }
}
