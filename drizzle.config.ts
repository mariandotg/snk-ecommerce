import type { Config } from 'drizzle-kit';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
  ENVIRONMENT,
} from './config';

const baseConfig: Config = {
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
};

const developmentConfig: Config = {
  ...baseConfig,
  driver: 'mysql2',
  dbCredentials: {
    port: DATABASE_PORT,
    host: DATABASE_HOST!,
    user: DATABASE_USERNAME!,
    password: DATABASE_PASSWORD!,
    database: DATABASE_NAME!,
  },
};

const productionConfig: Config = {
  ...baseConfig,
  dbCredentials: {
    connectionString: `mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?ssl={"rejectUnauthorized":true}`,
  },
  breakpoints: true,
};

const config: Config =
  ENVIRONMENT === 'production' ? productionConfig : developmentConfig;

export default config;
