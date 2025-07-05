import { INestApplication, Injectable } from "@nestjs/common"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { createContext } from "./trpc.context"
import { TrpcService } from "./trpc.service"
import { TInstance } from "./trpc.type"

@Injectable()
export class TrpcRouter {
  appRouter: ReturnType<TInstance["router"]>

  constructor(private readonly trpcService: TrpcService) {
    this.appRouter = this.trpcService.t.router({})
  }

  applyMiddleware(app: INestApplication) {
    app.use(
      "/trpc",
      createExpressMiddleware({
        router: this.appRouter,
        createContext,
      }),
    )
  }
}

export type AppRouter = TrpcRouter["appRouter"]
