import minecraftData, { ShapelessRecipe } from 'minecraft-data'
import { PrismaClient } from '@prisma/client'
import { Item } from '../types/prisma-types'

let prisma: PrismaClient

export async function runSeed () {
  prisma = new PrismaClient()
  const mcData: minecraftData.IndexedData = minecraftData('1.19')
  // const recipes = mcData.recipes
  const items: { [id: number]: minecraftData.Item } = mcData.items
  const recipes: { [id: number]: minecraftData.Recipe[] } = mcData.recipes
  // console.log('Truncating all tables...')
  // await truncateAll()
  // console.log('Finished truncating all tables...')
  const recipePayloads = buildRecipesPayloads(recipes)
  console.log(recipePayloads)
  // for (const key in recipePayloads) {
  //   try {
  //     await prisma.recipe.create({ data: recipePayloads[key] })
  //   } catch (e) {
  //     console.log(`Error creating recipe ${recipePayloads[key].id}: ${e}`)
  //   } finally {
  //     await prisma.$disconnect()
  //   }
  // }
  // for (const key in items) {
  //   try {
  //     await prisma.item.create({ data: buildItemsPayload(items[key]) })
  //   } catch (e) {
  //     console.log(`Error creating item ${items[key].displayName}: ${e}`)
  //   } finally {
  //     await prisma.$disconnect()
  //   }
  // }
}

function buildItemsPayload (item: Item) {
  return {
    id: item.id,
    name: item.name,
    display_name: item.displayName,
    stack_size: item.stackSize
  }
}

function buildRecipesPayloads (recipes: { [id: number]: minecraftData.Recipe[] }) {
  return Object.entries(recipes).map(([key, value]) => {
    const ingredients = (value[0] as minecraftData.ShapedRecipe & minecraftData.ShapelessRecipe).ingredients
    const inShape = (value[0] as minecraftData.ShapedRecipe & minecraftData.ShapelessRecipe).inShape
    const result = (value[0] as minecraftData.ShapedRecipe & minecraftData.ShapelessRecipe).result
    const count = (result as minecraftData.IdMetadata & minecraftData.Id1Metadata1Count1).count
    return {
      result_item_id: parseInt(key),
      result_quantity: count,
      in_shape: inShape,
      ingredients,
      result
    }
  })
  // return Object.entries(recipes).map(([key, value]) => {
  //   const ingredients = (value[0] as minecraftData.ShapedRecipe & minecraftData.ShapelessRecipe).ingredients
  //   const inShape = (value[0] as minecraftData.ShapedRecipe & minecraftData.ShapelessRecipe).inShape
  //   return {
  //     ingredients,
  //     inShape
  //   }
  // })
}

// add the following function's return type to the function declaration
const truncateAll = async () => {
  const tables: Array<{ name: string }> = await prisma.$queryRawUnsafe('SELECT name FROM sqlite_master WHERE type="table";')
  const filteredTables = tables.filter((table: { name: string }) => table.name !== '_prisma_migrations' && table.name !== 'sqlite_sequence')
  for (const table of filteredTables) {
    try {
      await truncate(table.name)
    } catch (e) {
      console.log(`Error truncating ${table.name} table: ${e}`)
    }
  }
}

const truncate = async (table: string) => {
  await prisma.$executeRawUnsafe(`DELETE FROM "${table}";`)
}
