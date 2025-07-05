import { RedisModule } from "@/redis/redis.module"
import { Module } from "@nestjs/common"
import { RatelimitGuard } from "./ratelimit.guard"
import { RatelimitService } from "./ratelimit.service"

@Module({
  imports: [RedisModule],
  providers: [RatelimitService, RatelimitGuard],
  exports: [RatelimitService, RatelimitGuard],
})
export class RatelimitModule {}
