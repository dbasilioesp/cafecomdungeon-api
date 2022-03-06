-- CreateTable
CREATE TABLE `episodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `episodeNumber` INTEGER NOT NULL DEFAULT 0,
    `name` VARCHAR(191) NOT NULL,
    `preview` TEXT NULL,
    `description` TEXT NOT NULL,
    `htmlDescription` TEXT NOT NULL,
    `releaseDate` DATETIME(3) NOT NULL,
    `imageUrl` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hosts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(191) NULL,
    `origin` VARCHAR(191) NOT NULL,
    `uri` VARCHAR(255) NULL,
    `url` VARCHAR(255) NULL,
    `durationMS` INTEGER NOT NULL,
    `audioPreviewUrl` VARCHAR(255) NULL,
    `episodeId` INTEGER NOT NULL,

    UNIQUE INDEX `hosts_episodeId_key`(`episodeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hosts` ADD CONSTRAINT `hosts_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `episodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
