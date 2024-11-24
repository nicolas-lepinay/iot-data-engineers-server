/*
  Warnings:

  - You are about to drop the column `equipmentId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `houseId` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[esp32Id,houseId]` on the table `Equipment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `equipmentEsp32Id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseEsp32Id` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_houseId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "equipmentId",
DROP COLUMN "houseId",
ADD COLUMN     "equipmentEsp32Id" TEXT NOT NULL,
ADD COLUMN     "houseEsp32Id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_esp32Id_houseId_key" ON "Equipment"("esp32Id", "houseId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_equipmentEsp32Id_houseEsp32Id_fkey" FOREIGN KEY ("equipmentEsp32Id", "houseEsp32Id") REFERENCES "Equipment"("esp32Id", "houseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_houseEsp32Id_fkey" FOREIGN KEY ("houseEsp32Id") REFERENCES "House"("esp32Id") ON DELETE RESTRICT ON UPDATE CASCADE;
