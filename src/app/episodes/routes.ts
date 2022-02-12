import { Router } from 'express'
import { PrismaClient } from "@prisma/client";
import EpisodesRepo from './repositories';

const router = Router()
const prisma = new PrismaClient()

router.get('/', listEpisodes)
router.get('/:id', getEpisode)

async function listEpisodes(req, res) {
  const result = await EpisodesRepo.findEpisodes(req.query);
  res.json(result);
}

async function getEpisode(req, res) {
  const id = Number(req.params.id)

  const episode = await prisma.episode.findUnique({
    where: { id },
    include: {
      hosts: true,
    },
  })

  res.json(episode);
}

export default router;