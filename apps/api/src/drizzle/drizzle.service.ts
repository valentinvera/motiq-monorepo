import { Injectable } from "@nestjs/common"
import { NeonHttpDatabase } from "drizzle-orm/neon-http"
import { dbConnection } from "./connection"
import * as schema from "./schema"

@Injectable()
export class DrizzleService {
  private db: NeonHttpDatabase<typeof schema> = dbConnection.db

  getDb() {
    return this.db
  }
}
