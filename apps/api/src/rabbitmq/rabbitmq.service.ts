import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices"

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private readonly client: ClientProxy

  constructor(private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>("RABBITMQ_URL") || ""],
        queue: this.configService.get<string>("RABBITMQ_QUEUE") || "",
        queueOptions: {
          durable: true,
        },
      },
    })
  }

  async onModuleInit() {
    await this.client.connect()
  }

  async onModuleDestroy() {
    await this.client.close()
  }

  getClient(): ClientProxy {
    return this.client
  }

  publish<TInput>(pattern: string, data: TInput): void {
    this.client.emit<void, TInput>(pattern, data).subscribe()
  }
}
