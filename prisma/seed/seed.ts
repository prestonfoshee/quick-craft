/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import { getMinecraftData, seedItems, seedRecipes, seedTextures, shortenUrls } from './seedUtils'

const prisma: PrismaClient = new PrismaClient();

(async () => {
  try {
    console.log(await shortenUrls(getMinecraftData().items))
    await seedItems(prisma, getMinecraftData().items)
    console.log('Items seeded')
    await seedTextures(prisma, getMinecraftData().items)
    console.log('Textures seeded')
    await seedRecipes(prisma, getMinecraftData().recipes)
    console.log('Recipes seeded')
    console.log('Seeding complete')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
})()

// might like object oriented approach better

// import { PrismaClient } from '@prisma/client';
// import { getMinecraftData, seedItems } from './seedUtils';

// class Seeder {
//   private prisma: PrismaClient;

//   constructor() {
//     this.prisma = new PrismaClient();
//   }

//   public async seed() {
//     try {
//       await seedItems(this.prisma, getMinecraftData().items);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
// }

// const seeder = new Seeder();
// seeder.seed();
