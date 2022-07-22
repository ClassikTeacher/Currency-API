-- CreateTable
CREATE TABLE `currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `currency_USD` INTEGER NOT NULL,
    `currency_EUR` INTEGER NOT NULL,
    `currency_RUB` INTEGER NOT NULL,
    `currency_JPY` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs_req` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `type_req` VARCHAR(30) NOT NULL,
    `id_currency` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `logs_req` ADD CONSTRAINT `logs_req_id_currency_fkey` FOREIGN KEY (`id_currency`) REFERENCES `currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
