import { Injectable } from '@nestjs/common';
import { Prisma, Purchase, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PurchaseRepository {
  constructor(private prisma: PrismaService) {}
  async createPurchase(data: Prisma.PurchaseCreateInput): Promise<Purchase> {
    return await this.prisma.purchase.create({ data });
  }
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
  async createManyPurchaseItems(data: Prisma.Purchase_itemsCreateManyInput[]) {
    return await this.prisma.purchase_items.createMany({ data });
  }
  async createManyProductSupplier(
    data: Prisma.Product_supplierCreateManyInput[],
  ) {
    return await this.prisma.product_supplier.createMany({ data });
  }
}
