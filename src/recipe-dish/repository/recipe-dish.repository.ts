import { Injectable } from '@nestjs/common';
import { Prisma, Product, Recipe_Dish } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDishRepository } from '../interface/recipe_dish.repository.interface';
import { CreateDishRepository } from '../interface/dish.items.repository.interface';
import { UpdateRecipeDishRepository } from '../interface/update.recipe.dish.repository.interface';
import { removeUndefinedFields } from '../helpers/remove.undefined.field.helper';
import { UpdateDishItemsRepository } from '../interface/update.dish.items.repository.interface';

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
        id_product: item.id_product,
        quantity: item.quantity,
        unit_measurement: item.unit_measurement,
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
    data: UpdateRecipeDishRepository,
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
    idRecipeDish: string,
    products: Partial<UpdateDishItemsRepository>[],
    tx: Prisma.TransactionClient,
  ) {
    await Promise.all(
      products.map(async ({ id_dish, ...data }) => {
        const formattedData = removeUndefinedFields({
          ...data,
          id_recipe_dish: idRecipeDish,
        });

        return await tx.dish.upsert({
          where: {
            id_dish: id_dish ?? '',
          },

          update: {
            ...formattedData,
          },

          create: {
            ...formattedData,
          } as Prisma.DishUncheckedCreateInput,
        });
      }),
    );
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
