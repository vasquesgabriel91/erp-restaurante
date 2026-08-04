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
    const show_in_app = data.show_in_app;

    const categoryExists = await this.CategoriesRepository.findByName(name);
    if (categoryExists) throw new Error('Category already exists');

    return this.CategoriesRepository.create({
      name,
      display_order,
      show_in_whatsapp,
      show_in_app,
    });
  }
  async getAllWithWhatsAppTrue(): Promise<Categories[]> {
    return this.CategoriesRepository.getAllWithWhatsAppTrue();
  }

  async getAllCategories(): Promise<Categories[]> {
    return this.CategoriesRepository.getAllCategories();
  }

  async findById(id: string): Promise<Categories | null> {
    const category = await this.CategoriesRepository.findById(id);
    if (!category) throw new Error('Category not found');
    return category;
  }
  async deleteCategory(id: string): Promise<void> {
    const categoryExists = await this.CategoriesRepository.findByName(id);
    if (!categoryExists) throw new Error('Category not found');
    await this.CategoriesRepository.deleteCategory(id);
  }
}
