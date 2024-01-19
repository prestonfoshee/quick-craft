import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { recipesRoute } from './recipes'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish()
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
        time: new Date()
      }
    }),

  prismaTest: publicProcedure
    .query(
      async ({ ctx }) => {
        const example = await ctx.prisma.example.findFirst()
        return {
          example
        }
      }
      // async ({ ctx }) => await ctx.prisma.example.findMany()
    ),
  recipes: recipesRoute

  // getRecipes: publicProcedure
  //   .input(
  //     z.object({
  //       search: z.string().nullish()
  //     })
  //   )
  //   .query(({ input }) => {
  //     return { search_val: `${input?.search ?? 'empty'}` }
  //   })
})

// export type definition of API
export type AppRouter = typeof appRouter
