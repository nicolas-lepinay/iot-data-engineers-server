/*
  Warnings:

  - Made the column `esp32Id` on table `Equipment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `esp32Id` on table `House` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "esp32Id" SET NOT NULL;

-- AlterTable
ALTER TABLE "House" ALTER COLUMN "esp32Id" SET NOT NULL;
