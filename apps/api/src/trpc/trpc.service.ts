import { Injectable } from "@nestjs/common"
import { initTRPC, TRPCError } from "@trpc/server"
import { Context } from "./trpc.context"

@Injectable()
export class TrpcService {
  readonly t = initTRPC.context<Context>().create()

  publicProcedure = this.t.procedure

  protectedProcedure() {
    return this.t.procedure.use(async opts => {
      const user = opts.ctx.user

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      return opts.next({
        ctx: {
          ...opts.ctx,
          user,
        },
      })
    })
  }
}
