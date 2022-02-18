import { Prisma, PrismaClient } from "@prisma/client";
import SpotifyService from '../src/app/spotify/services'

const prisma = new PrismaClient()

async function main() {

  let data: any = await SpotifyService.loadEpisodes();
  data = data.reverse()

  console.log('---------')
  console.log("Load from spotify finished. Number of items ", data.length)

  let count = 1;

  for (const ep of data) {
    for (const item of ep.items.reverse()) {
      await saveEpisode(item, count)
      count += 1
    }
  }

  console.log("Load database finished.")

  process.exit();
}

async function saveEpisode(item, count) {
  const episode = {
    name: item.name,
    description: item.description,
    episodeNumber: count,
    htmlDescription: item.html_description,
    releaseDate: new Date(item.release_date),
    imageUrl: item.images[0].url,
  }

  const newEpisode = await prisma.episode.create({ data: episode })

  const host: any = {
    origin: 'spotify',
    externalId: item.id,
    uri: item.uri,
    url: item.external_urls?.spotify,
    durationMS: Number(item.duration_ms),
    audioPreviewUrl: item.audio_preview_url,
    episodeId: newEpisode.id
  }

  await prisma.host.create({ data: host })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })