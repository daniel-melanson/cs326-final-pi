/*
  Warnings:

  - You are about to drop the column `categories` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "categories",
DROP COLUMN "state",
DROP COLUMN "type";
