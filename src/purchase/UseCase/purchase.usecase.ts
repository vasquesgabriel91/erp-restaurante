import { UnitConverter } from '../domain/converter.unit.measurement';
import { PurchaseDto } from '../dto/purchase.dto';
import { PurchaseRepository } from '../repository/purchase.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PurchaseUseCase {
  constructor(private PurchaseRepository: PurchaseRepository) {}

  async execute(data: PurchaseDto) {
    const idProducts = data.items.map((i) => i.id_product);

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
          originalUnit: req.unit_measurement,
          dbUnit: unitdb,
          quantity: convertedValue,
          unitPrice,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
    const total = result.reduce((acc, item) => acc + item.unitPrice, 0);
    return {
      items: result,
      total,
    };
  }
}
