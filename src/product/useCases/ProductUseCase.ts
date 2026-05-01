import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../repository/ProductRepository';
import { CreateProductDto } from '../dto/CreateProductDto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: CreateProductDto): Promise<Product> {
    const name = data.name.trim().toLowerCase();

    const validUnits = ['kg', 'g', 'un', 'l', 'ml'];
    if (!validUnits.includes(data.unit_measurement))
      throw new BadRequestException('Unidade de medida inválida');

    if (data.current_quantity < data.minimum_quantity)
      throw new BadRequestException(
        'Quantidade atual não pode ser menor que a mínima',
      );

    const productExists = await this.productRepository.findByName(name);
    if (productExists) throw new BadRequestException('Produto já existe');

    return this.productRepository.createProduct({
      ...data,
      name,
    });
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

    const name = data.name.trim().toLowerCase();

    const validUnits = ['kg', 'g', 'un', 'l', 'ml'];
    if (!validUnits.includes(data.unit_measurement))
      throw new BadRequestException('Unidade de medida inválida');
    if (data.current_quantity < data.minimum_quantity)
      throw new BadRequestException(
        'Quantidade atual não pode ser menor que a mínima',
      );

    return this.productRepository.createProduct({
      ...data,
      name,
    });
  }

  async delete(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Produto não encontrado');
    return this.productRepository.deleteProduct(id);
  }
}
