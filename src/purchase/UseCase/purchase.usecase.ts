import { PurchaseDto } from '../dto/purchase.dto';
import { PurchaseRepository } from '../repository/purchase.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PurchaseUseCase {
  constructor(private PurchaseRepository: PurchaseRepository) {}

  async execute(data: PurchaseDto) {
    const idProducts = data.items.map((i) => i.id_product);

    const products = await this.PurchaseRepository.getAllProducts(idProducts);

    const purchaseItems = products.map((p) => ({
      id: p.id_product,
      unit: p.unit_measurement,
    }));

    // itens enviados na requisição
    const requestItems = data.items.map((i) => ({
      id: i.id_product,
      unit: i.unit_measurement,
    }));

    // pegar apenas os diferentes
    const differentItems = requestItems.filter((reqItem) => {
      const dbItem = purchaseItems.find((p) => p.id === reqItem.id);

      // se não existir ou for diferente → mantém
      return dbItem && dbItem.unit !== reqItem.unit;
    });

    return differentItems;
  }
}
