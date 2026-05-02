import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
  async getAll(): Promise<Supplier[]> {
    return this.SupplierRepository.findAll();
  }
  async findById(id: string): Promise<Supplier> {
    const supplierById = await this.SupplierRepository.findById(id);
    if (!supplierById) {
      throw new HttpException(
        'Fornecedor não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    return supplierById;
  }

  async delete(id: string): Promise<Supplier | null> {
    const supplierById = await this.SupplierRepository.findById(id);
    if (!supplierById) throw new ConflictException('Fornecedor não encontrado');

    return this.SupplierRepository.delete(id);
  }
}
