import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductUseCase } from './useCases/ProductUseCase';
import { CreateProductDto } from './dto/CreateProductDto';
import { Product } from '@prisma/client';

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

  // @Put(':id'){
  //   async update(@Param('id') id: string, @Body() body: CreateProductDto): Promise<Product> {
  //     return this.ProductUseCase.update(id, body);
  //   }
  // }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return this.ProductUseCase.delete(id);
  }
}
