import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, Supplier } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SupplierRepository {
  constructor(private prisma: PrismaService) {}
  async createSupplier(data: Prisma.SupplierCreateInput): Promise<Supplier> {
    try {
      const supplier = await this.prisma.supplier.create({
        data,
      });
      return supplier;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erro ao criar fornecedor no repositório',
        error: error instanceof Error ? error.message : 'unknown',
      });
    }
  }

  async findByName(name: string): Promise<Supplier | null> {
    try {
      const supplier = await this.prisma.supplier.findFirst({
        where: { name },
      });
      return supplier;
    } catch (error: unknown) {
      throw new InternalServerErrorException({
        message: 'Erro ao buscar fornecedor por nome no repositório',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
