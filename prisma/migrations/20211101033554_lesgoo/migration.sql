/*
  Warnings:

  - You are about to drop the column `projectId` on the `issue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectTitle` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_projectId_fkey`;

-- DropIndex
DROP INDEX `Issue_title_key` ON `issue`;

-- AlterTable
ALTER TABLE `issue` DROP COLUMN `projectId`,
    ADD COLUMN `projectTitle` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Project_title_key` ON `Project`(`title`);

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_projectTitle_fkey` FOREIGN KEY (`projectTitle`) REFERENCES `Project`(`title`) ON DELETE RESTRICT ON UPDATE CASCADE;
