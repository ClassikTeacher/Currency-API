/*
  Warnings:

  - You are about to drop the column `currency_EUR` on the `currency` table. All the data in the column will be lost.
  - You are about to drop the column `currency_JPY` on the `currency` table. All the data in the column will be lost.
  - You are about to drop the column `currency_RUB` on the `currency` table. All the data in the column will be lost.
  - You are about to drop the column `currency_USD` on the `currency` table. All the data in the column will be lost.
  - Added the required column `EUR` to the `currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PY` to the `currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RUB` to the `currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `USD` to the `currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `currency` DROP COLUMN `currency_EUR`,
    DROP COLUMN `currency_JPY`,
    DROP COLUMN `currency_RUB`,
    DROP COLUMN `currency_USD`,
    ADD COLUMN `EUR` DOUBLE NOT NULL,
    ADD COLUMN `PY` DOUBLE NOT NULL,
    ADD COLUMN `RUB` DOUBLE NOT NULL,
    ADD COLUMN `USD` DOUBLE NOT NULL;
