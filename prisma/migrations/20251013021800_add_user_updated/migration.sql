/*
  Warnings:

  - You are about to drop the column `UserId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_UserId_fkey`;

-- DropIndex
DROP INDEX `Task_UserId_fkey` ON `Task`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `UserId`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
