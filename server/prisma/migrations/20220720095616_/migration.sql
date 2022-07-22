/*
  Warnings:

  - You are about to alter the column `currency_USD` on the `currency` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `currency_EUR` on the `currency` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `currency_RUB` on the `currency` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `currency_JPY` on the `currency` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `currency` MODIFY `currency_USD` DOUBLE NOT NULL,
    MODIFY `currency_EUR` DOUBLE NOT NULL,
    MODIFY `currency_RUB` DOUBLE NOT NULL,
    MODIFY `currency_JPY` DOUBLE NOT NULL;
