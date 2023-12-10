import { Shoe } from '@/models/Shoe';
import { db } from './db';
import { shoes } from './db/schema';
import { PlanetScaleDatabase } from 'drizzle-orm/planetscale-serverless';
import { MySql2Database } from 'drizzle-orm/mysql2';

export default async function getAllShoes(): Promise<Shoe[]> {
  console.log(shoes);

  const shoesData = await db!
    .select({ description: shoes.description })
    .from(shoes);

  //@ts-ignore
  return shoesData;
}
