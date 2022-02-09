/*
  Warnings:

  - You are about to drop the `EpisodeNetwork` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EpisodeNetwork" DROP CONSTRAINT "EpisodeNetwork_episodeId_fkey";

-- DropTable
DROP TABLE "EpisodeNetwork";

-- CreateTable
CREATE TABLE "Host" (
    "id" SERIAL NOT NULL,
    "internalId" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "uri" TEXT,
    "href" TEXT,
    "durationMS" INTEGER NOT NULL,
    "episodeId" INTEGER NOT NULL,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Host_episodeId_key" ON "Host"("episodeId");

-- AddForeignKey
ALTER TABLE "Host" ADD CONSTRAINT "Host_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
