import { TrpcRouter } from "@/trpc/trpc.router"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import compression from "compression"
import helmet from "helmet"
import { AppModule } from "./app.module"

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  })
  const configService: ConfigService = app.get(ConfigService)

  app.use(compression())
  app.setGlobalPrefix("api")
  app.enableCors({
    origin: configService.get<string>("WEB_URL"),
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    credentials: true,
  })
  app.use(helmet())

  const trpc = app.get(TrpcRouter)
  trpc.applyMiddleware(app)

  const port = configService.get<number>("PORT")
  await app.listen(port as number)
}

bootstrap().catch(err => {
  console.error(err)
  process.exit(1)
})
