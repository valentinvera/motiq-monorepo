import { AuthModule } from "@/auth/auth.module"
import { validate } from "@/config/env/validator"
import { DrizzleModule } from "@/drizzle/drizzle.module"
import { RawBodyMiddleware } from "@/middleware/raw-body.middleware"
import { NeonModule } from "@/neon/neon.module"
import { RabbitmqModule } from "@/rabbitmq/rabbitmq.module"
import { RabbitmqService } from "@/rabbitmq/rabbitmq.service"
import { RatelimitGuard } from "@/ratelimit/ratelimit.guard"
import { RatelimitModule } from "@/ratelimit/ratelimit.module"
import { RedisModule } from "@/redis/redis.module"
import { TrpcModule } from "@/trpc/trpc.module"
import { TrpcRouter } from "@/trpc/trpc.router"
import { MiddlewareConsumer, Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
    }),
    DrizzleModule,
    NeonModule,
    TrpcModule,
    RedisModule,
    RatelimitModule,
    RabbitmqModule,
    AuthModule,
  ],
  providers: [
    TrpcRouter,
    {
      provide: APP_GUARD,
      useClass: RatelimitGuard,
    },
    RabbitmqService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes("*path")
  }
}
