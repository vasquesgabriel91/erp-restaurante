import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../repository/categories.repository';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { Categories } from '@prisma/client';

@Injectable()
export class CategoriesUseCase {
  constructor(private CategoriesRepository: CategoriesRepository) {}

  async execute(data: CreateCategoryDto): Promise<Categories> {
    const name = data.name;
    const display_order = data.display_order;
    const show_in_whatsapp = data.show_in_whatsapp;
    return this.CategoriesRepository.create({
      name,
      display_order,
      show_in_whatsapp,
    });
  }
  async getAllWithWhatsAppTrue(): Promise<Categories[]> {
    return this.CategoriesRepository.getAllWithWhatsAppTrue();
  }
}
