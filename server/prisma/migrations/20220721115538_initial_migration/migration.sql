-- CreateTable
CREATE TABLE `api_keys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
