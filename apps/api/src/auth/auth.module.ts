import { auth } from "@/lib/auth"
import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { AuthController } from "./auth.controller"
import { AuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: "AUTH_PROVIDER",
      useFactory: () => auth,
    },
  ],
  exports: ["AUTH_PROVIDER", AuthService],
})
export class AuthModule {}
