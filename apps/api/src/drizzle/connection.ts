import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

config({ path: ".env" })

const connection = () => {
  const DATABASE_URL = process.env.DATABASE_URL!
  const sql = neon(DATABASE_URL)
  const db = drizzle({ client: sql, schema })
  return { sql, db }
}

export const dbConnection = connection()
