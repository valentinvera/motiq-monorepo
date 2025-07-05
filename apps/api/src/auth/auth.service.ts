import { Inject, Injectable } from "@nestjs/common"
import { type betterAuth } from "better-auth"
import { fromNodeHeaders } from "better-auth/node"
import { Request } from "express"

@Injectable()
export class AuthService {
  constructor(
    @Inject("AUTH_PROVIDER") private readonly authInstance: ReturnType<typeof betterAuth>,
  ) {}

  async getSession(req: Request) {
    const headers = req.headers
    return await this.authInstance.api.getSession({
      headers: fromNodeHeaders(headers),
    })
  }
}
