import { plainToInstance } from "class-transformer"
import { IsBoolean, IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator"
import { Envs } from "./constants"

export class EnvsValidator {
  @IsNumber()
  @IsNotEmpty()
  [Envs.PORT]!: number;

  @IsString()
  @IsNotEmpty()
  [Envs.DATABASE_URL]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.UPSTASH_REDIS_URL]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.UPSTASH_REDIS_TOKEN]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.RABBITMQ_URL]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.RABBITMQ_QUEUE]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.WEB_URL]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.BETTER_AUTH_SECRET]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.BETTER_AUTH_URL]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.GOOGLE_CLIENT_ID]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.GOOGLE_CLIENT_SECRET]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.POLAR_ACCESS_TOKEN]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.POLAR_SERVER]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.POLAR_PRODUCT_ID]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.API_URL]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.POLAR_SUCCESS_URL]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.BASE_URL]!: string;

  @IsBoolean()
  @IsNotEmpty()
  [Envs.SECURE_COOKIES]!: boolean;

  @IsNumber()
  @IsNotEmpty()
  [Envs.RESET_PASSWORD_TOKEN_EXPIRES_IN]!: number;

  @IsNumber()
  @IsNotEmpty()
  [Envs.EMAIL_VERIFICATION_EXPIRES_IN]!: number;

  @IsNumber()
  @IsNotEmpty()
  [Envs.SESSION_FRESH_AGE]!: number;

  @IsNumber()
  @IsNotEmpty()
  [Envs.RATE_LIMIT_WINDOW]!: number;

  @IsNumber()
  @IsNotEmpty()
  [Envs.RATE_LIMIT_MAX]!: number;

  @IsNumber()
  @IsNotEmpty()
  [Envs.RATE_LIMIT_WINDOW_AUTH]!: number;

  @IsNumber()
  @IsNotEmpty()
  [Envs.RATE_LIMIT_MAX_AUTH]!: number;

  @IsString()
  @IsNotEmpty()
  [Envs.COOKIE_PREFIX]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.COOKIE_NAME]!: string;

  @IsString()
  @IsNotEmpty()
  [Envs.COOKIE_SAME_SITE]!: "none" | "lax";

  @IsNumber()
  @IsNotEmpty()
  [Envs.COOKIE_MAX_AGE]!: number
}

export const validate = (config: Record<string, unknown>): EnvsValidator => {
  const validatedConfig = plainToInstance(EnvsValidator, config, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}
