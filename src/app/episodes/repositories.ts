import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findEpisodes(query) {
  const { q, page, order } = query;
  const take = 20
  const skip = page ? Number(page) * take : 0;

  const options: any = {
    take,
    skip,
    include: { hosts: true },
    orderBy: { id: "desc" }
  }

  if (order) {
    if (["asc", "desc"].includes(String(order))) {
      options.orderBy.id = order;
    }
  }

  if (q) {
    options.where = {
      OR: [
        { name: { contains: q } },
        { description: { contains: q } },
      ]
    }
  }

  const data = await prisma.episode.findMany(options)
  const total = await prisma.episode.count({ where: options.where })

  return { data, total, page, query: q }
}

export default {
  findEpisodes,
}