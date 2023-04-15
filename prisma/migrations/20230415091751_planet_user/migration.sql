/*
  Warnings:

  - You are about to drop the column `updateBy` on the `Planet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Planet" DROP COLUMN "updateBy",
ADD COLUMN     "updatedBy" VARCHAR(255);
