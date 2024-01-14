/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `item_id` on the `Item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "item_id";

-- CreateIndex
CREATE UNIQUE INDEX "Item_id_key" ON "Item"("id");
