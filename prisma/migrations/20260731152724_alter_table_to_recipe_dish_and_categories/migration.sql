/*
  Warnings:

  - You are about to drop the column `category` on the `Recipe_Dish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe_Dish" DROP COLUMN "category",
ADD COLUMN     "id_category" UUID;

-- AddForeignKey
ALTER TABLE "Recipe_Dish" ADD CONSTRAINT "Recipe_Dish_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Categories"("id_category") ON DELETE SET NULL ON UPDATE CASCADE;
