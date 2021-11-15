/*
  Warnings:

  - You are about to drop the column `userId` on the `comment` table. All the data in the column will be lost.
  - The values [Developer,Admin] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `username` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `issuemodification` DROP FOREIGN KEY `IssueModification_createdBy_fkey`;

-- DropIndex
DROP INDEX `User_password_key` ON `user`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `userId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `issue` MODIFY `img` VARCHAR(191);

-- AlterTable
ALTER TABLE `issuemodification` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('DEVELOPER', 'ADMIN', 'USER') NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IssueModification` ADD CONSTRAINT `IssueModification_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
