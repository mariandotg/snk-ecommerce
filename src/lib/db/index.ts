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

async function getDB() {
  if (ENVIRONMENT === 'production') {
    const psConnection = await mysql.createConnection({
      uri: `mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?ssl={"rejectUnauthorized":true}`,
    });

    return drizzle(psConnection, { schema, mode: 'planetscale' });
  } else {
    const mysqlConnection = await mysql.createConnection({
      host: DATABASE_HOST,
      user: DATABASE_USERNAME,
      database: DATABASE_NAME,
      port: DATABASE_PORT,
      password: DATABASE_PASSWORD,
    });

    return drizzle(mysqlConnection, { schema, mode: 'default' });
  }
}

export const db = await getDB();
