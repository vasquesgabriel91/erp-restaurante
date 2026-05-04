import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    try {
      return this.prisma.product.create({ data });
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erro ao criar produto no repositório',
        error: error instanceof Error ? error.message : 'unknown',
      });
    }
  }

  async findByName(name: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: { name },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id_product: id },
    });
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { id_product: id },
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id_product: id },
      data,
    });
  }
}
