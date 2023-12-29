'use server';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import { LoginFormValues } from '@/models/LoginFormValues';

export default async function getUser(
  values: LoginFormValues
): Promise<LoginFormValues> {
  const usersResult = await db
    .select()
    .from(users)
    .where(eq(users.email, values.email));

  return usersResult[0];
}
