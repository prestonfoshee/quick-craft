import { PrismaClient } from '@prisma/client'
import { getMinecraftData, seedItems, seedRecipes } from './seedUtils'

const prisma: PrismaClient = new PrismaClient();

(async () => {
  try {
    await seedItems(prisma, getMinecraftData().items)
    await seedRecipes(prisma, getMinecraftData().recipes)
  } catch (error) {
    console.error('Error:', error)
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
