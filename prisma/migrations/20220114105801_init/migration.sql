-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "spotifyId" VARCHAR(50) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "htmlDescription" TEXT NOT NULL,
    "durationMS" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "image" JSONB,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EpisodeNetwork" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "uri" TEXT,
    "url" TEXT,
    "episodeId" INTEGER NOT NULL,

    CONSTRAINT "EpisodeNetwork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EpisodeNetwork_episodeId_key" ON "EpisodeNetwork"("episodeId");

-- AddForeignKey
ALTER TABLE "EpisodeNetwork" ADD CONSTRAINT "EpisodeNetwork_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
