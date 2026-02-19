/*
  Warnings:

  - You are about to drop the column `posterPath` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Favorite` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Favorite_userId_movieId_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "posterPath",
DROP COLUMN "title";
