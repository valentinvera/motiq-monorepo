import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Redis } from "@upstash/redis"

@Injectable()
export class RedisService {
  private client: Redis

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis({
      url: this.configService.get<string>("UPSTASH_REDIS_URL") || "",
      token: this.configService.get<string>("UPSTASH_REDIS_TOKEN") || "",
    })
  }

  getClient(): Redis {
    return this.client
  }
}
