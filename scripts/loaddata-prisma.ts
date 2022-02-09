import { Prisma, PrismaClient } from "@prisma/client";
import dump from './queries/public_episodes02_export_2022-01-14_070923.json';
// import oneline from './queries/one_line.json';

const prisma = new PrismaClient()

async function saveEpisode(data) {
  const host = {
    name: 'spotify',
    internalId: String(data.internal_id),
    durationMS: data.duration_ms,
    uri: data.uri,
    href: data.href,
    audioPreviewUrl: data.audio_preview_url,
  }

  const episode = {
    name: data.name,
    description: data.description,
    htmlDescription: data.html_description,
    releaseDate: new Date(data.release_date),
    image: data.images['0'].url,
    hosts: {
      create: [host]
    }
  }

  await prisma.episode.create({ data: episode });
}

async function main() {
  // const episode = dump[0]

  for (const episode of dump) {
    await saveEpisode(episode)
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })