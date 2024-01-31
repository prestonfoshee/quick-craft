import { PrismaClient } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient()

export const textureByItemId = async (itemId: number): Promise<string | undefined> => {
  try {
    const texture = await prisma.texture.findFirst({
      where: {
        item_id: itemId
      },
      select: {
        url: true
      }
    })
    return texture?.url
  } catch (error) {
    console.error('Error getting texture: ', error)
    return undefined
  }
}
