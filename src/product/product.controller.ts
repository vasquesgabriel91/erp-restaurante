import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductUseCase } from './useCases/product.usecase';
import { CreateProductDto } from './dto/createproduct.dto';
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: CreateProductDto,
  ): Promise<Product> {
    return this.ProductUseCase.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return this.ProductUseCase.delete(id);
  }
}
