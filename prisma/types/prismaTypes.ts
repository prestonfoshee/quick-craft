import minecraftData from 'minecraft-data'

export type MinecraftDataItems = { [id: number]: minecraftData.Item }

export type MinecraftDataRecipes = { [id: number]: minecraftData.Recipe[] }

export type MinecraftData = {
  items: MinecraftDataItems,
  recipes: MinecraftDataRecipes
}

export type Recipe = {
  inShape: Array<number>,
  result: {
    id: number,
    count: number
  }
}

export type Item = {
  id: number,
  name: string,
  displayName: string,
  stackSize: number
}

export type InShape = number[] | number[][];
