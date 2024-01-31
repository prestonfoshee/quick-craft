/* eslint-disable camelcase */
/* eslint-disable no-console */
import minecraftData from 'minecraft-data'
import { PrismaClient, Prisma } from '@prisma/client'
import { Item, MinecraftData, MinecraftDataItems, MinecraftDataRecipes, InShape } from '../types/prismaTypes'
import { assets } from './assets'
import { textureByItemId } from './seedRepository'

const textureBaseUrl = 'https://raw.githubusercontent.com/rom1504/minecraft-assets/master/data/1.20.2/'

export const getMinecraftData = (): MinecraftData => {
  const mcData: minecraftData.IndexedData = minecraftData('1.19')
  const items: MinecraftDataItems = mcData.items
  const recipes: MinecraftDataRecipes = mcData.recipes
  return { items, recipes }
}

export const seedItems = async (prisma: PrismaClient, items: MinecraftDataItems): Promise<void> => {
  const itemArray: Prisma.ItemCreateInput[] = Object.values(items).map((item: Item): Prisma.ItemCreateInput => {
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

export const seedTextures = async (prisma: PrismaClient, items: MinecraftDataItems): Promise<void> => {
  const shortenedUrls = (await shortenUrls(items) as Prisma.TextureCreateInput[])
  for (const item of shortenedUrls) {
    try {
      await prisma.texture.create({ data: item })
    } catch (error) {
      console.error('Error seeding Items table: ', error)
    }
  }
}

export const seedRecipes = async (prisma: PrismaClient, recipes: object): Promise<void> => {
  const recipePayloads = await getReipePayloads(recipes)
  for (const recipe of recipePayloads) {
    try {
      await prisma.recipe.create({ data: recipe })
    } catch (error) {
      console.error('Error seeding Recipes table: ', error)
    }
  }
}

export const getReipePayloads = async (recipes: object): Promise<Prisma.RecipeCreateInput[]> => {
  try {
    const payloads = await Promise.all(
      Object.values(recipes).map(async (recipe, i) => {
        const id: number = parseInt(Object.keys(recipes)[i])
        const inShape: InShape = recipe[0].inShape
        const ingredients: number[] = recipe[0].ingredients
        const shape: InShape = inShape || ingredients

        const textures: any[] = []
        for (const item of shape) {
          if (Array.isArray(item)) {
            const subArray = []
            for (const subItem of item) {
              if (subItem) {
                const texture: string | undefined = await textureByItemId(subItem)
                subArray.push(texture as string)
              }
            }
            textures.push(subArray)
          } else {
            const texture: string | undefined = await textureByItemId(item as number)
            textures.push(texture as string)
          }
        }
        const resolvedTextures = Array.isArray(textures) ? await Promise.all(textures) : textures
        const resultItem = { connect: { id } }
        return { result_item: resultItem, shape: JSON.stringify(resolvedTextures) }
      })
    )
    return payloads
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw error
  }
}

const shortenUrls = async (items: MinecraftDataItems): Promise<({ url: string; item: { connect: { id: number; }; }; } | undefined)[]> => {
  const apiToken = process.env.TINYURL_API_KEY
  const url = 'https://api.tinyurl.com/create/'
  const promises = Object.values(items).map(async (item: Item) => {
    const { id, name } = item
    const urlTexture: string = `${textureBaseUrl}${assets.getTexture(name)}.png`
      .replace('minecraft:', '')
      .replace('block', 'blocks')
    try {
      const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: urlTexture })
      })
      if (!response.ok) {
        throw new Error(`Failed to shorten url: ${urlTexture}`)
      }
      const { data: { tiny_url } } = await response.json() as { data: { tiny_url: string } }
      return { url: tiny_url, item: { connect: { id } } }
    } catch (error) {
      console.error(error)
    }
  })
  return await Promise.all(promises)
}
