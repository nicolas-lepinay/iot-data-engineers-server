/*
  Warnings:

  - A unique constraint covering the columns `[esp32Id]` on the table `House` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "esp32Id" TEXT;

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "esp32Id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "House_esp32Id_key" ON "House"("esp32Id");
