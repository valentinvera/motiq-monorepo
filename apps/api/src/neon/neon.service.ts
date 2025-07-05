import { dbConnection } from "@/drizzle/connection"
import { Injectable } from "@nestjs/common"

@Injectable()
export class NeonService {
  getNeon() {
    return dbConnection.sql
  }
}
