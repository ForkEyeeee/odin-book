/*
  Warnings:

  - Made the column `googleId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "googleId" SET NOT NULL;
