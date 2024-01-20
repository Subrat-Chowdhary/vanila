-- AlterTable
ALTER TABLE `course` ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Certification` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `issuedDate` DATETIME(3) NOT NULL,

    INDEX `Certification_userId_idx`(`userId`),
    INDEX `Certification_courseId_idx`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
