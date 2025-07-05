import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"
import { AuthService } from "./auth.service"

export const IS_PUBLIC_ROUTE_KEY = "isPublicRoute"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: Request & { user?: any } = context.switchToHttp().getRequest<Request>()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) return true

    const session = await this.authService.getSession(req)
    if (session && session.user) {
      req.user = session.user
      return true
    }
    return false
  }
}
