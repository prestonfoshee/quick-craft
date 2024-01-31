import { z } from 'zod'
import { Recipe } from '../types/recipeTypes'
import { publicProcedure, router } from '../trpc'
import { getRecipesByDisplayName } from '../repositories/recipeRepository'

export const recipesRoute = router({
  getRecipes: publicProcedure
    .input(
      z.object({
        search: z.string().nullish()
      })
    )
    .query(async ({ input }) => {
      const search = input?.search || ''
      const recipesData: Recipe[] = await getRecipesByDisplayName(search)
      const recipes = recipesData.map((recipe) => {
        return {
          resultItemId: recipe.result_item.id,
          resultItemTexture: recipe.result_item.textures[0].url,
          displayName: recipe.result_item.display_name,
          shape: JSON.parse(recipe.shape as string)
        }
      })
      return { recipes }
    })
})
