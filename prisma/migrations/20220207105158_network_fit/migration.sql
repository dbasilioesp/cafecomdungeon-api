/*
  Warnings:

  - You are about to drop the column `durationMS` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `spotifyId` on the `Episode` table. All the data in the column will be lost.
  - Added the required column `durationMS` to the `EpisodeNetwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internalId` to the `EpisodeNetwork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "durationMS",
DROP COLUMN "spotifyId";

-- AlterTable
ALTER TABLE "EpisodeNetwork" ADD COLUMN     "durationMS" INTEGER NOT NULL,
ADD COLUMN     "internalId" VARCHAR(50) NOT NULL;
