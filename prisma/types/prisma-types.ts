export type Recipe = {
  id: number,
  type: string,
  ingredients: Ingredient[],
  result: Result
}

export type Item = {
  id: number,
  name: string,
  displayName: string,
  stackSize: number
}
