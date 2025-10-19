/*
  Warnings:

  - Added the required column `UserId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `UserId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
