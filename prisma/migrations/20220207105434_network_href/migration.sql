/*
  Warnings:

  - You are about to drop the column `url` on the `EpisodeNetwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EpisodeNetwork" DROP COLUMN "url",
ADD COLUMN     "href" TEXT;
