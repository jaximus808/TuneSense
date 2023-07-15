-- AlterTable
ALTER TABLE `User` ADD COLUMN `correct` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `incorrect` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codeId` VARCHAR(191) NOT NULL,
    `pass` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Test_codeId_key`(`codeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
