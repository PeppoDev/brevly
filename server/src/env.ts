import { z } from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	HOST: z.string().default('localhost'),
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	POSTGRESQL_USERNAME: z.string().default('postgres'),
	POSTGRESQL_PASSWORD: z.string().default('postgres'),
	POSTGRESQL_DATABASE: z.string().default('upload'),
	POSTGRESQL_PORT: z.string().default('5432'),
	CLOUDFLARE_ACCOUNT_ID: z.string(),
	CLOUDFLARE_ACCESS_KEY_ID: z.string(),
	CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
	CLOUDFLARE_BUCKET: z.string(),
	CLOUDFLARE_PUBLIC_URL: z.string().url(),
})

const parsedEnv = envSchema.parse(process.env)

const DATABASE_URL = `postgres://${parsedEnv.POSTGRESQL_USERNAME}:${parsedEnv.POSTGRESQL_PASSWORD}@localhost:${parsedEnv.POSTGRESQL_PORT}/${parsedEnv.POSTGRESQL_DATABASE}`

export const env = { ...parsedEnv, DATABASE_URL }
