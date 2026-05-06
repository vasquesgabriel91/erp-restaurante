import { Product } from '@prisma/client';
import { UnitConverter } from '../domain/converter.unit.measurement';
import { PurchaseDto } from '../dto/purchase.dto';
import { PurchaseRepository } from '../repository/purchase.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class PurchaseUseCase {
  constructor(private PurchaseRepository: PurchaseRepository) {}

  async execute(data: PurchaseDto) {
    const idProducts = data.items.map((i) => i.id_product);
    const idSupplier = data.id_supplier;
    const dataCompra = data.date;
    const products = await this.PurchaseRepository.getAllProducts(idProducts);

    // transforma banco em lookup rápido
    const dbMap = new Map(
      products.map((p) => [p.id_product, p.unit_measurement]),
    );

    const result = data.items
      .map((req) => {
        const unitdb = dbMap.get(req.id_product);
        const unitPrice = req.unit_price;

        if (!unitdb) return null;

        // valida se pode converter
        const convertedValue =
          req.unit_measurement === unitdb
            ? req.quantity
            : UnitConverter.convert(
                req.quantity,
                req.unit_measurement,
                unitdb as any,
              );

        return {
          id: req.id_product,
          quantity: convertedValue,
          unitPrice,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    const total = result.reduce((acc, item) => acc + item.unitPrice, 0);

    const hash = await this.createHash(data, result);

    const purchase = await this.PurchaseRepository.createPurchase({
      date: dataCompra,
      total_price: total,
      hash,
      supplier: {
        connect: {
          id_supplier: idSupplier,
        },
      },
    });
    const purchaseId = purchase.id_purchase;

    await this.PurchaseRepository.createManyPurchaseItems(
      result.map((item) => ({
        id_purchase: purchaseId,
        id_product: item.id,
        quantity: item.quantity,
        unit_price: item.unitPrice,
      })),
    );

    await this.PurchaseRepository.createManyProductSupplier(
      result.map((item) => ({
        id_supplier: idSupplier,
        id_product: item.id,
      })),
    );

    const processedQuantityOfProducts = this.processedItemForStock(
      result,
      products,
    );

    await this.PurchaseRepository.updateQuantityProduct(
      processedQuantityOfProducts,
    );

    return {
      dataCompra,
      items: result,
      hash: hash,
      total,
    };
  }

  async createHash(
    data: PurchaseDto,
    items: { id: string; quantity: number; unitPrice: number }[],
  ): Promise<string> {
    const hash = crypto
      .createHash('sha256')
      .update(
        JSON.stringify({
          supplier: data.id_supplier,
          date: data.date,
          items: items
            .map((i) => ({
              id: i.id,
              quantity: i.quantity,
              price: i.unitPrice,
            }))
            .sort((a, b) => a.id.localeCompare(b.id)),
        }),
      )
      .digest('hex');

    const exists = await this.PurchaseRepository.findByHash(hash);

    if (exists) {
      throw new ConflictException('Compra duplicada');
    }

    return hash;
  }

  processedItemForStock(
    result: { id: string; quantity: number }[],
    products: Product[],
  ) {
    const processedItems = products.map((p) => {
      const item = result.find((i) => i.id === p.id_product);
      if (!item) {
        throw new Error(`Produto ${p.id_product} não encontrado no result`);
      }

      return {
        id_product: p.id_product,
        quantity: p.current_quantity + item.quantity,
      };
    });
    return processedItems;
  }

  async getAllPurchases() {
    return await this.PurchaseRepository.getAllPurchases();
  }

  async getById(id: string) {
    return await this.PurchaseRepository.getPurchasesByIds([id]);
  }
}
