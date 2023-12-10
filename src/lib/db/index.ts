import { connect as psConnect } from '@planetscale/database';
// import { drizzle as psDrizzle } from 'drizzle-orm/planetscale-serverless';
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';
import {
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_NAME,
  ENVIRONMENT,
  DATABASE_PORT,
} from '../../../config';
import { shoes } from './schema';

async function getDB() {
  if (ENVIRONMENT === 'production') {
    const psConnection = await mysql.createConnection({
      uri: `mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?ssl={"rejectUnauthorized":true}`,
    });

    return drizzle(psConnection, { mode: 'planetscale' });
  } else {
    const mysqlConnection = await mysql.createConnection({
      host: DATABASE_HOST,
      user: DATABASE_USERNAME,
      database: DATABASE_NAME,
      port: DATABASE_PORT,
      password: DATABASE_PASSWORD,
    });

    return drizzle(mysqlConnection, { mode: 'default' });
  }
}

export const db = await getDB();
