-- CreateTable
CREATE TABLE `Tasks` (
    `id` CHAR(36) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
