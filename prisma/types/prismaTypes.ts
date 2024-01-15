import minecraftData from 'minecraft-data'

export type MinecraftDataItems = { [id: number]: minecraftData.Item }

export type MinecraftDataRecipes = { [id: number]: minecraftData.Recipe[] }

export type InShape = number[][] | number[]

export type MinecraftData = {
  items: MinecraftDataItems,
  recipes: MinecraftDataRecipes,
  // texture: string
}

export type Item = {
  id: number,
  name: string,
  displayName: string,
  stackSize: number
}

export type Recipe = {
  inShape: Array<number>,
  result: {
    id: number,
    count: number
  }
}
