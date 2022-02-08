import { Router } from 'express'
import { PrismaClient } from "@prisma/client";

const router = Router()

router.get('/', async (req, res) => {
  const { q, page } = req.query;
  const take = 20
  const skip = page ? Number(page) * take : 0;

  const options: any = {
    take,
    skip,
    include: {
      hosts: true,
    },
  }

  if (q) {
    options.where = {
      description: {
        contains: q,
      }
    }
  }

  const prisma = new PrismaClient();

  const allEpisodes = await prisma.episode.findMany(options)
  const total = await prisma.episode.count()

  res.json({ data: allEpisodes, page, skip, query: q, size: allEpisodes.length, total });
});

export default router;