-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_roomId_fkey";

-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "roomId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
