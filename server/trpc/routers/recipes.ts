// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
// import * as trpc from '@trpc/server'
import { z } from 'zod'
import minecraftData from 'minecraft-data'
import { publicProcedure, router } from '../trpc'

export const recipesRoute = router({
  getRecipes: publicProcedure
    .input(
      z.object({
        search: z.string().nullish()
      })
    )
    .query(({ input }) => {
      const mcData = minecraftData('1.19')
      const recipeTest = mcData.itemsByName.granite
      return {
        search_val: `${input?.search ?? 'empty'}`,
        recipe_test: recipeTest
      }
    })
})
