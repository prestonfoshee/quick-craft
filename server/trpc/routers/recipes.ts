// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
// import * as trpc from '@trpc/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { publicProcedure, router } from '../trpc'

const prisma = new PrismaClient()

export const recipesRoute = router({
  getRecipes: publicProcedure
    .input(
      z.object({
        search: z.string().nullish()
      })
    )
    .query(async ({ input }) => {
      const search = input?.search || ''

      const recipes = await prisma.recipe.findMany({
        include: {
          result_item: {
            select: {
              display_name: true
            }
          }
        },
        where: {
          result_item: {
            display_name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        }
      })

      return { recipes }
    })
})
