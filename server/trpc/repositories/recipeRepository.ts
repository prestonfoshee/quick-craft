import { PrismaClient } from '@prisma/client'
import { Recipe } from '../types/recipeTypes'

const prisma: PrismaClient = new PrismaClient()

export const getRecipesByDisplayName = async (search: string): Promise<Recipe[]> => {
  try {
    const recipes: Recipe[] = await prisma.recipe.findMany({
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
    return recipes
  } catch (error) {
    console.error('Error getting recipes: ', error)
    return []
  }
}
