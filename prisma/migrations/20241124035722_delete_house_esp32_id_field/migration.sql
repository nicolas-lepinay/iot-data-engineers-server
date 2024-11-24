/*
  Warnings:

  - You are about to drop the column `houseEsp32Id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `esp32Id` on the `House` table. All the data in the column will be lost.
  - Added the required column `houseId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_equipmentEsp32Id_houseEsp32Id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_houseEsp32Id_fkey";

-- DropIndex
DROP INDEX "House_esp32Id_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "houseEsp32Id",
ADD COLUMN     "houseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "House" DROP COLUMN "esp32Id";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_equipmentEsp32Id_houseId_fkey" FOREIGN KEY ("equipmentEsp32Id", "houseId") REFERENCES "Equipment"("esp32Id", "houseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
