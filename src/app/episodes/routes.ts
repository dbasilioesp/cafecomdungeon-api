import { Router } from 'express'
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient();

router.get('/', listEpisodes);
router.get('/:id', getEpisode)

async function listEpisodes(req, res) {
  const { q, page, order } = req.query;
  const take = 20
  const skip = page ? Number(page) * take : 0;

  const options: any = {
    take,
    skip,
    include: {
      hosts: true,
    },
    orderBy: {
      id: "desc"
    }
  }

  if (order) {
    if (["asc", "desc"].includes(String(order))) {
      options.orderBy.id = order;
    }
  }

  if (q) {
    options.where = {
      description: {
        contains: q,
      }
    }
  }



  const allEpisodes = await prisma.episode.findMany(options)
  const total = await prisma.episode.count()

  res.json({ data: allEpisodes, page, skip, query: q, size: allEpisodes.length, total });
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