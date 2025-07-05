import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response, json, urlencoded } from "express"

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (req.originalUrl.startsWith("/api/auth")) {
      next()
      return
    }

    json()(req, res, error => {
      if (error) {
        next(error)
        return
      }
      urlencoded({ extended: true })(req, res, next)
    })
  }
}
