import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

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
    )
})

// export type definition of API
export type AppRouter = typeof appRouter
