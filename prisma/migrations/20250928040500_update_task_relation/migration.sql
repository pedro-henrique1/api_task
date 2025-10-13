/*
  Warnings:

  - You are about to drop the `_TaskToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `UserId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_TaskToUser` DROP FOREIGN KEY `_TaskToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TaskToUser` DROP FOREIGN KEY `_TaskToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `UserId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_TaskToUser`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
