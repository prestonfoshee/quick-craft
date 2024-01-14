import minecraftData from 'minecraft-data'
import { PrismaClient, Prisma } from '@prisma/client'
import { number } from 'zod'
import { Item, Recipe, MinecraftData, MinecraftDataItems, MinecraftDataRecipes, InShape } from '../types/prismaTypes'

export const getMinecraftData = (): MinecraftData => {
  const mcData: minecraftData.IndexedData = minecraftData('1.19')
  // const recipes = mcData.recipes
  const items: { [id: number]: minecraftData.Item } = mcData.items
  const recipes: { [id: number]: minecraftData.Recipe[] } = mcData.recipes
  return { items, recipes }
}

export const seedItems = async (prisma: PrismaClient, items: MinecraftDataItems): Promise<void> => {
  const itemArray = Object.values(items).map((item: Item): Prisma.ItemCreateInput => {
    const { id, name, displayName, stackSize } = item
    return { id, name, display_name: displayName, stack_size: stackSize }
  })
  for (const item of itemArray) {
    try {
      await prisma.item.create({ data: item })
    } catch (error) {
      console.error('Error seeding Items table: ', error)
    }
  }
}

export const seedRecipes = async (prisma: PrismaClient, recipes: object) => {
  const recipePayloads: Prisma.RecipeCreateInput[] = getReipePayloads(recipes)
  for (const recipe of recipePayloads) {
    try {
      await prisma.recipe.create({ data: recipe })
      // await prisma.
    } catch (error) {
      console.error('Error seeding Recipes table: ', error)
    }
  }
}

function getReipePayloads (recipes: object): Prisma.RecipeCreateInput[] {
  return Object.values(recipes).map((recipe, i): Prisma.RecipeCreateInput => {
    const id: number = parseInt(Object.keys(recipes)[i])
    const inShape: InShape = recipe[0].inShape
    const ingredients: number[] = recipe[0].ingredients
    const shapeString: string = inShape ? JSON.stringify(inShape) : JSON.stringify(ingredients)
    // const shapeString: string = Array.isArray(inShape) && (inShape as number[][]).every((item: number | number[]) => Array.isArray(item)) ? JSON.stringify(inShape.flat(2)) : JSON.stringify([inShape])
    const resultItem = { connect: { id } }
    return { result_item: resultItem, shape: shapeString }
  })
}
