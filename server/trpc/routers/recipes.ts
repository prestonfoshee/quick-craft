// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
// import * as trpc from '@trpc/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { faCropSimple } from '@fortawesome/free-solid-svg-icons'
import { publicProcedure, router } from '../trpc'
import { assets } from './assets'
import { ItemWithRecipes } from '~/prisma/types/prismaTypes'

const prisma = new PrismaClient()

type Textures = {
  id: number;
  textures: {
      url: string;
  }[]
}[]

export const recipesRoute = router({
  getRecipes: publicProcedure
    .input(
      z.object({
        search: z.string().nullish()
      })
    )
    .query(async ({ input }) => {
      const search = input?.search || ''
      // @todo: move query to repository
      const recipes = await prisma.recipe.findMany({
        where: {
          result_item: {
            display_name: {
              contains: search
            }
          }
        },
        select: {
          shape: true,
          result_item: {
            select: {
              id: true,
              display_name: true,
              textures: {
                select: {
                  url: true
                }
              }
            }
          }
        }
      })
      return { recipes }
    })
})
