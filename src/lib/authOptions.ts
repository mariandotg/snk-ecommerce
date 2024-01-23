import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { NextAuthOptions } from 'next-auth';
import { db } from './db';
import { mysqlTableCreator } from 'drizzle-orm/mysql-core';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NEXTAUTH_URL } from '../../config';

type Adapter = NextAuthOptions['adapter'];

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(
    db,
    mysqlTableCreator((name) => `snk_ecommerce_${name}`)
  ) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 3000,
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log({ credentials });
        const authResponse = await fetch(`${NEXTAUTH_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (!authResponse.ok) {
          console.log('login null');
          return null;
        }

        console.log('login nvalido');
        const user = await authResponse.json();
        console.log({ user });

        return user;
      },
    }),
  ],
};
