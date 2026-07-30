import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    user: process.env.POSTGRES_USER ?? 'gama',
    password: process.env.POSTGRES_PASSWORD ?? 'change-me',
    database: process.env.POSTGRES_DB ?? 'gama_vip',
    ssl: false,
  },
} satisfies Config;
