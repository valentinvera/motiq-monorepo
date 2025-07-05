import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common"
import { Request } from "express"
import { RatelimitService } from "./ratelimit.service"

@Injectable()
export class RatelimitGuard implements CanActivate {
  constructor(private readonly ratelimitService: RatelimitService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const path = request.path

    if (path.startsWith("/auth/")) {
      return true
    }

    let identifier = "anonymous"
    if (request.ip && typeof request.ip === "string") {
      identifier = request.ip
    }

    const isAllowed = await this.ratelimitService.limit(identifier)

    if (!isAllowed) {
      throw new HttpException("Too Many Requests", HttpStatus.TOO_MANY_REQUESTS)
    }

    return true
  }
}
