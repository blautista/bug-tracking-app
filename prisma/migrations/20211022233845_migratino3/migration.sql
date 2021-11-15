/*
  Warnings:

  - You are about to alter the column `category` on the `issue` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Issue_category")`.

*/
-- AlterTable
ALTER TABLE `issue` MODIFY `category` ENUM('BUG', 'TASK', 'ENHANCEMENT', 'NEWFEATURE') NOT NULL;
