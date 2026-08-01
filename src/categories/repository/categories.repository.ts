import { Injectable } from '@nestjs/common';
import { Categories, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoriesCreateInput): Promise<Categories> {
    return await this.prisma.categories.create({ data });
  }

  async getAllWithWhatsAppTrue(): Promise<Categories[]> {
    return await this.prisma.categories.findMany({
      where: {
        show_in_whatsapp: true,
      },
    });
  }
}
