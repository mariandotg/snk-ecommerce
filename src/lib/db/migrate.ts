import { PlanetScaleDatabase } from 'drizzle-orm/planetscale-serverless';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { migrate as psMigrate } from 'drizzle-orm/planetscale-serverless/migrator';
import { migrate as mysqlMigrate } from 'drizzle-orm/mysql2/migrator';
import { db } from './index';
import { ENVIRONMENT } from '../../../config';

const connectionConfig = {
  migrationsFolder: './migrations',
};

await mysqlMigrate(
  db as MySql2Database<Record<string, never>>,
  connectionConfig
);
