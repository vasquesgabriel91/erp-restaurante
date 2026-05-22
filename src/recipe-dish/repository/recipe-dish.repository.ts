import { Injectable } from '@nestjs/common';
import { Prisma, Product, Recipe_Dish } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDishRepository } from '../interface/recipe_dish.repository.interface';
import { CreateDishRepository } from '../interface/dish.items.repository.interface';

@Injectable()
export class RecipeDishRepository {
  constructor(
    private prisma: PrismaService,
    private readonly prismaService: PrismaService,
  ) {}

  async findProductById(idProduct: string[]): Promise<Product[]> {
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
  async findDishByNameAndId(
    nameDish: string,
    id: string,
  ): Promise<Recipe_Dish | null> {
    const findDishByName = await this.prisma.recipe_Dish.findFirst({
      where: {
        name_dish: nameDish,
        NOT: {
          id_recipe_dish: id,
        },
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
  async getAll(): Promise<Recipe_Dish[]> {
    const recipeDish = await this.prisma.recipe_Dish.findMany({
      include: {
        dish: true,
      },
    });
    return recipeDish;
  }
  async findById(id: string) {
    const recipeDish = await this.prisma.recipe_Dish.findUnique({
      where: {
        id_recipe_dish: id,
      },
      include: {
        dish: true,
      },
    });
    return recipeDish;
  }

  async updateDish(
    id: string,
    data: CreateRecipeDishRepository,
    tx: Prisma.TransactionClient,
  ) {
    const updateRecipeDish = await tx.recipe_Dish.update({
      where: {
        id_recipe_dish: id,
      },
      data: {
        name_dish: data.nameDish,
        description_dish: data.descriptionDish,
        selling_price_dish: data.sellingPriceDish,
        available_dish: data.availableDish,
      },
    });
    return updateRecipeDish;
  }

  async updateManyRecipe(
    id: string,
    products: CreateDishRepository[],
    tx: Prisma.TransactionClient,
  ) {
    const deleteDishMany = await tx.dish.deleteMany({
      where: {
        id_recipe_dish: id,
      },
    });
    const createDishMany = await tx.dish.createMany({
      data: products.map((item) => ({
        id_recipe_dish: id,
        id_product: item.idProduct,
        quantity: item.quantityProduct,
        unit_measurement: item.unitMeasurement,
      })),
    });
    return {
      deleteDishMany,
      createDishMany,
    };
  }

  async delete(id: string): Promise<Recipe_Dish | void> {
    const deleteDish = await this.prismaService.$transaction(async (tx) => {
      await tx.dish.deleteMany({
        where: {
          id_recipe_dish: id,
        },
      });
      await tx.recipe_Dish.delete({
        where: {
          id_recipe_dish: id,
        },
      });
    });
    return deleteDish;
  }
}
