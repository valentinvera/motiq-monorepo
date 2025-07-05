import { All, Controller, Inject, Req, Res } from "@nestjs/common"
import { betterAuth } from "better-auth"
import { toNodeHandler } from "better-auth/node"
import { Request, Response } from "express"
import { PublicRoute } from "./public-route.decorator"

@Controller("/auth/")
export class AuthController {
  constructor(
    @Inject("AUTH_PROVIDER") private readonly authInstance: ReturnType<typeof betterAuth>,
  ) {}

  @All("*path")
  @PublicRoute()
  async handleAuth(@Req() req: Request, @Res() res: Response): Promise<void> {
    return await toNodeHandler(this.authInstance)(req, res)
  }
}
