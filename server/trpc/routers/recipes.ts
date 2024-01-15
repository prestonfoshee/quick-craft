// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
// import * as trpc from '@trpc/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { faCropSimple } from '@fortawesome/free-solid-svg-icons'
import { publicProcedure, router } from '../trpc'
import { assets } from './assets'

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
      // const url = 'https://raw.githubusercontent.com/rom1504/minecraft-assets/master/data/1.8.8/' + assets.getTexture('iron_pickaxe') + '.png'
      // const base64 = assets.textureContent.wheat_seeds.texture
      // return { url, base64 }
      const recipes = await prisma.recipe.findMany({
        include: {
          result_item: {
            select: {
              display_name: true,
              texture: true
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
