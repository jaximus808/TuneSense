/*
  Warnings:

  - Added the required column `left` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `right` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Test` ADD COLUMN `left` DOUBLE NOT NULL,
    ADD COLUMN `right` DOUBLE NOT NULL;
