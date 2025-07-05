import { NeonModule } from "@/neon/neon.module"
import { Module } from "@nestjs/common"
import { DrizzleService } from "./drizzle.service"

@Module({
  imports: [NeonModule],
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DrizzleModule {}
