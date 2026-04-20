-- CreateEnum
CREATE TYPE "Status" AS ENUM ('FREE', 'FULL');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'FREE';
