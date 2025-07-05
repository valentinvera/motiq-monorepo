import { dbConnection } from "@/drizzle/connection"
import { RedisService } from "@/redis/redis.service"
import { ConfigService } from "@nestjs/config"
import { checkout, polar, portal, usage } from "@polar-sh/better-auth"
import { Polar } from "@polar-sh/sdk"
import { betterAuth, RateLimit } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

const configService: ConfigService = new ConfigService()
const redisService = new RedisService(configService)
const redisClient = redisService.getClient()

export const polarClient = new Polar({
  accessToken: configService.get<string>("POLAR_ACCESS_TOKEN")!,
  server: configService.get<"sandbox" | "production">("POLAR_SERVER")!,
  timeoutMs: 10000,
})

export const auth = betterAuth({
  database: drizzleAdapter(dbConnection.db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: configService.get<number>("RESET_PASSWORD_TOKEN_EXPIRES_IN")!,
  },
  socialProviders: {
    google: {
      clientId: configService.get<string>("GOOGLE_CLIENT_ID")!,
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET")!,
      redirectURI: `${configService.get<string>("API_URL")!}/auth/callback/google`,
    },
  },
  trustedOrigins: [configService.get<string>("WEB_URL")!, configService.get<string>("API_URL")!],
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: configService.get<string>("POLAR_PRODUCT_ID")!,
              slug: "pro",
            },
          ],
          successUrl: configService.get<string>("SUCCESS_URL")!,
          authenticatedUsersOnly: true,
          theme: "dark",
        }),
        portal(),
        usage(),
      ],
    }),
  ],
  secondaryStorage: {
    get: async (key: string) => {
      const rawValue = await redisClient.get(key)

      if (rawValue === null || typeof rawValue === "undefined") return null

      let stringValue: string

      if (typeof rawValue === "string") {
        stringValue = rawValue
      } else if (Buffer.isBuffer(rawValue)) {
        stringValue = rawValue.toString("utf8")
      } else {
        await redisClient.del(key)
        return null
      }

      if (stringValue === "[object Object]") {
        await redisClient.del(key)
        return null
      }

      return stringValue
    },
    set: async (key, value, ttl) => {
      const stringValue = typeof value === "string" ? value : JSON.stringify(value)
      if (ttl) await redisClient.set(key, stringValue, { ex: ttl })
      else await redisClient.set(key, stringValue)
    },
    delete: async key => {
      await redisClient.del(key)
    },
  },
  appName: "motiq",
  baseURL: configService.get<string>("BASE_URL")!,
  secret: configService.get<string>("BETTER_AUTH_SECRET")!,
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: Number(configService.get<number>("EMAIL_VERIFICATION_EXPIRES_IN")!),
  },
  session: {
    freshAge: Number(configService.get<number>("SESSION_FRESH_AGE")!),
    storeSessionInDatabase: true,
    preserveSessionInDatabase: true,
    cookieCache: {
      enabled: true,
    },
  },
  account: {
    accountLinking: {
      trustedProviders: ["google", "email-password"],
    },
  },
  rateLimit: {
    enabled: true,
    window: configService.get<number>("RATE_LIMIT_WINDOW")!,
    max: configService.get<number>("RATE_LIMIT_MAX")!,
    customRules: {
      "/auth/*": {
        window: configService.get<number>("RATE_LIMIT_WINDOW_AUTH")!,
        max: configService.get<number>("RATE_LIMIT_MAX_AUTH")!,
      },
    },
    customStorage: {
      async get(key) {
        const result = await redisClient.get(key)
        if (!result || typeof result !== "string") return undefined
        const parsed = JSON.parse(result) as RateLimit
        return parsed
      },
      async set(key: string, value: RateLimit) {
        await redisClient.set(key, JSON.stringify(value))
      },
    },
    storage: "secondary-storage",
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
      disableIpTracking: false,
    },
    useSecureCookies: configService.get<string>("SECURE_COOKIES") === "true",
    disableCSRFCheck: false,
    cookies: {
      session_token: {
        name: configService.get<string>("COOKIE_NAME")!,
        attributes: {
          httpOnly: true,
          secure: configService.get<string>("SECURE_COOKIES") === "true",
          expires: new Date(
            Date.now() + Number(configService.get<number>("COOKIE_MAX_AGE")!) * 1000,
          ),
          sameSite: "lax",
        },
      },
    },
    defaultCookieAttributes: {
      httpOnly: true,
      secure: configService.get<string>("SECURE_COOKIES") === "true",
      expires: new Date(Date.now() + Number(configService.get<number>("COOKIE_MAX_AGE")!) * 1000),
      sameSite: "lax",
    },
    cookiePrefix: configService.get<string>("COOKIE_PREFIX")!,
  },
})
