import { Router } from 'express'
import { PrismaClient } from "@prisma/client";

const router = Router()

router.get('/', async (req, res) => {
  const prisma = new PrismaClient();

  const allEpisodes = await prisma.episode.findMany()

  res.json(allEpisodes);
});

export default router;