/*
  Warnings:

  - You are about to drop the column `texture` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "texture";

-- CreateTable
CREATE TABLE "Texture" (
    "item_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Texture_item_id_key" ON "Texture"("item_id");

-- AddForeignKey
ALTER TABLE "Texture" ADD CONSTRAINT "Texture_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
