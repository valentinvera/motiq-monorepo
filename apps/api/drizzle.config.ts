import "dotenv/config"
import { defineConfig, type Config } from "drizzle-kit"

export default defineConfig({
  out: "./drizzle",
  schema: "./src/**/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config)
