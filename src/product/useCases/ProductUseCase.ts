import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../repository/ProductRepository';
import { CreateProductDto } from '../dto/CreateProductDto';
import { Product } from '@prisma/client';
import { ProductValidator } from '../domain/ProductValidator';

@Injectable()
export class ProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: CreateProductDto): Promise<Product> {
    try {
      const validatedData = ProductValidator.validate(data);

      const productExists = await this.productRepository.findByName(
        validatedData.name,
      );
      if (productExists) {
        throw new BadRequestException('Produto já existe');
      }

      return this.productRepository.createProduct(validatedData);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException('Erro inesperado');
    }
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async update(id: string, data: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Produto não encontrado');

    const validatedData = ProductValidator.validate(data);
    return this.productRepository.update(id, validatedData);
  }

  async delete(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Produto não encontrado');
    return this.productRepository.deleteProduct(id);
  }
}
