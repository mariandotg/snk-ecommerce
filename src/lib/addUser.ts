'use server';
import { RegisterFormValues } from '@/models/RegisterFormValues';
import { db } from './db';
import { users } from './db/schema';
import bcrypt from 'bcrypt';

export default async function addUser(values: RegisterFormValues) {
  const { password, email } = values;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  await db.insert(users).values({
    email,
    password: hashedPassword,
  });
}
