import { Injectable } from '@nestjs/common';
import { Prisma, Product, Recipe_Dish } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDishRepository } from '../interface/recipe_dish.repository.interface';
import { CreateDishRepository } from '../interface/dish.items.repository.interface';

@Injectable()
export class RecipeDishRepository {
  constructor(private prisma: PrismaService) {}

  async findById(idProduct: string[]): Promise<Product[]> {
    const productId = await this.prisma.product.findMany({
      where: {
        id_product: {
          in: idProduct,
        },
      },
    });
    return productId;
  }

  async findDishByName(nameDish: string): Promise<Recipe_Dish | null> {
    const findDishByName = await this.prisma.recipe_Dish.findFirst({
      where: {
        name_dish: nameDish,
      },
    });
    return findDishByName;
  }

  async findRecipeByIdDish(
    id_recipe_dish: string,
  ): Promise<
    { id_product: string; quantity: number; unit_measurement: string }[]
  > {
    const findRecipeByIdDish = await this.prisma.dish.findMany({
      where: { id_recipe_dish },
      select: {
        id_product: true,
        quantity: true,
        unit_measurement: true,
      },
    });
    return findRecipeByIdDish;
  }

  async createRecipeDish(
    data: CreateRecipeDishRepository,
    tx: Prisma.TransactionClient,
  ) {
    return await tx.recipe_Dish.create({
      data: {
        name_dish: data.nameDish,
        description_dish: data.descriptionDish,
        selling_price_dish: data.sellingPriceDish,
        available_dish: data.availableDish,
      },
    });
  }
  async createDish(
    idRecipeDish: string,
    product: CreateDishRepository[],
    tx: Prisma.TransactionClient,
  ) {
    return await tx.dish.createMany({
      data: product.map((item) => ({
        id_recipe_dish: idRecipeDish,
        id_product: item.idProduct,
        quantity: item.quantityProduct,
        unit_measurement: item.unitMeasurement,
      })),
    });
  }
}
