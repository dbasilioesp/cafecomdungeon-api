const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
import { Database, Resource } from '@adminjs/prisma'
import { PrismaClient } from "@prisma/client";
import { DMMFClass } from '@prisma/client/runtime'

const prisma = new PrismaClient();
const dmmf = ((prisma as any)._dmmf as DMMFClass)

AdminJS.registerAdapter({ Database, Resource })

export const adminJs = new AdminJS({
  databases: [],
  resources: [
    {
      resource: { model: dmmf.modelMap.Episode, client: prisma },
      options: {
        listProperties: ['name', 'episodeNumber', 'releaseDate'],
        sort: {
          sortBy: 'episodeNumber',
          direction: 'desc'
        },
        properties: {
          description: { type: 'textarea' },
          preview: { type: 'richtext' },
          htmlDescription: { type: 'richtext' }
        }
      },
    },
    {
      resource: { model: dmmf.modelMap.Host, client: prisma },
    }
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'Regra da Casa: CCD',
  },
})

export const adminJsRouter = AdminJSExpress.buildRouter(adminJs)

