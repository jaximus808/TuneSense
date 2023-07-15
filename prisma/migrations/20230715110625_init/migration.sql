/*
  Warnings:

  - You are about to drop the column `incorrect` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `incorrect`,
    ADD COLUMN `total` INTEGER NOT NULL DEFAULT 0;
