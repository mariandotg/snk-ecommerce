import { connect as psConnect } from '@planetscale/database';
import { drizzle as psDrizzle } from 'drizzle-orm/planetscale-serverless';
import { drizzle as mysqlDrizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import {
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_NAME,
  ENVIRONMENT,
  DATABASE_PORT,
} from '../../../config';

let database;

if (ENVIRONMENT === 'production') {
  const psConnection = psConnect({
    host: DATABASE_HOST,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
  });

  database = psDrizzle(psConnection);
} else {
  const mysqlConnection = await mysql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USERNAME,
    database: DATABASE_NAME,
    port: DATABASE_PORT,
    password: DATABASE_PASSWORD,
  });

  database = mysqlDrizzle(mysqlConnection);
}

export const db = database;
