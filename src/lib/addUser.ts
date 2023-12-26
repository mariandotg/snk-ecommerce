'use server';
import { RegisterFormValues } from '@/models/RegisterFormValues';
import { db } from './db';
import { users } from './db/schema';

export default async function addUser(values: RegisterFormValues) {
  await db.insert(users).values(values);
}
