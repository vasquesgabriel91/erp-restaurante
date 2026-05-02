import { ConflictException, Injectable } from '@nestjs/common';
import { SupplierRepository } from '../repository/supplier.repository';
import { SupplierDto } from '../dto/supplier.dto';
import { Supplier } from '@prisma/client';
@Injectable()
export class SupplierUseCase {
  constructor(private SupplierRepository: SupplierRepository) {}

  async execute(data: SupplierDto): Promise<Supplier> {
    const name = data.name.trim().toLowerCase();
    const supplierExists = await this.SupplierRepository.findByName(name);

    if (supplierExists) throw new ConflictException('Fornecedor já existe');

    return this.SupplierRepository.createSupplier({
      name,
      cnpj: data.cnpj,
    });
  }
}
