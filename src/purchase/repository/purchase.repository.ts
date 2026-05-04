import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchaseRepository {
  constructor(private prisma: PrismaService) {}
  async getAllProducts(idProduct: string[]): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        id_product: {
          in: idProduct,
        },
      },
    });
    return products;
  }
}
