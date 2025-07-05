import { auth } from "@/lib/auth"
import { fromNodeHeaders } from "better-auth/node"
import { TrpcContext } from "./trpc.type"

export const createContext = async ({
  req,
  res,
  info,
  user,
}: TrpcContext): Promise<TrpcContext> => {
  const headers = req.headers
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(headers),
  })

  return {
    req,
    res,
    info,
    user: session?.user
      ? {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image ?? null,
          emailVerified: session.user.emailVerified,
        }
      : undefined,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
