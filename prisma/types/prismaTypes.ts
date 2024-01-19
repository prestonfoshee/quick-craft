import minecraftData from 'minecraft-data'
import { Prisma } from '@prisma/client'
import { GetResult } from '@prisma/client/runtime'

export type MinecraftDataItems = { [id: number]: minecraftData.Item }

export type MinecraftDataRecipes = { [id: number]: minecraftData.Recipe[] }

export type InShape = number[][] | number[]

export type MinecraftData = {
  items: MinecraftDataItems,
  recipes: MinecraftDataRecipes
}

export type Item = {
  id: number,
  name: string,
  displayName: string,
  stackSize: number
}

export type ItemWithRecipes = ({
  recipes: (GetResult<{
      result_item_id: number;
      shape: Prisma.JsonValue;
  }, { [x: string]: () => unknown; }> & {})[]
} & GetResult<{
  id: number;
  name: string;
  display_name: string;
  stack_size: number;
}, { [x: string]: () => unknown; }> & {})[]
