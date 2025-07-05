import { CreateExpressContextOptions } from "@trpc/server/dist/adapters/express.cjs"
import { TrpcService } from "./trpc.service"

export interface TrpcContext extends CreateExpressContextOptions {
  user?: {
    id: string
    name: string
    email: string
    image: string | null
    emailVerified: boolean
  }
}

export type TInstance = TrpcService["t"]
