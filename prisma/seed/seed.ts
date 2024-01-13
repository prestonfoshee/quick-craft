import { runSeed } from './seed-data'

(() => {
  try {
    runSeed()
  } catch (e) {
    console.error('Error while seeding database:', e)
  }
})()
