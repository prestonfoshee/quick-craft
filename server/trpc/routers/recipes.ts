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

      const items: ItemWithRecipes = await prisma.item.findMany({
        where: { display_name: { contains: search, mode: 'insensitive' } },
        include: { recipes: true }
      })

      const textures: Textures[] = []

      // need to check for duplicate item ids in shape
      for (const item of items) {
        for (const recipe of item.recipes) {
          const shapeJsonString: number[]|null[] = JSON.parse((recipe.shape as unknown) as string)
          const itemIdsInShape = Array.isArray(shapeJsonString[0])
            ? shapeJsonString.flat()
            : shapeJsonString
          const filteredItempIdsInShape: number[] = itemIdsInShape.filter((id: number | null): id is number => id !== null)
          const recipeTextures: Textures = await prisma.item.findMany({
            where: { id: { in: filteredItempIdsInShape } },
            select: { id: true, textures: { select: { url: true } } }
          })
          textures.push(recipeTextures)
        }
      }

      return { texturesArray: textures }
    })
})
