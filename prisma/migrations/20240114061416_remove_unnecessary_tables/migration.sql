/*
  Warnings:

  - You are about to drop the column `display_name` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[result_item_id]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `result_item_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shape` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_recipeId_fkey";

-- DropIndex
DROP INDEX "Recipe_id_key";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "display_name",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "result_item_id" INTEGER NOT NULL,
ADD COLUMN     "shape" JSONB NOT NULL;

-- DropTable
DROP TABLE "Example";

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "Result";

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_result_item_id_key" ON "Recipe"("result_item_id");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_result_item_id_fkey" FOREIGN KEY ("result_item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
