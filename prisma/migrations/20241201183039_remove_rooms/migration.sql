/*
  Warnings:

  - You are about to drop the column `roomId` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_houseId_fkey";

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "roomId";

-- DropTable
DROP TABLE "Room";
