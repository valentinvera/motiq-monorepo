import { config } from "dotenv"
import { migrate } from "drizzle-orm/neon-http/migrator"
import { dbConnection } from "./connection"

config({ path: ".env" })

const main = async () => {
  try {
    await migrate(dbConnection.db, { migrationsFolder: "drizzle" })
  } catch (err) {
    console.error("Error during migration:", err)
    process.exit(1)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
