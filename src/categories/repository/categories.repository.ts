import { Injectable } from '@nestjs/common';
import { Categories, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoriesCreateInput): Promise<Categories> {
    return await this.prisma.categories.create({ data });
  }

  async findByName(name: string): Promise<Categories | null> {
    return await this.prisma.categories.findFirst({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<Categories | null> {
    return await this.prisma.categories.findUnique({
      where: {
        id_category: id,
      },
    });
  }

  async getAllWithWhatsAppTrue(): Promise<Categories[]> {
    return await this.prisma.categories.findMany({
      where: {
        show_in_whatsapp: true,
      },
    });
  }

  async getAllCategories(): Promise<Categories[]> {
    return await this.prisma.categories.findMany();
  }

  async deleteCategory(id: string): Promise<void> {
    await this.prisma.categories.delete({
      where: {
        id_category: id,
      },
    });
  }
}
