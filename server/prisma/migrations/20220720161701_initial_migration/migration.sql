/*
  Warnings:

  - You are about to drop the column `PY` on the `currency` table. All the data in the column will be lost.
  - Added the required column `JPY` to the `currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `currency` DROP COLUMN `PY`,
    ADD COLUMN `JPY` DOUBLE NOT NULL;
