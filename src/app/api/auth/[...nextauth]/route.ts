import { db } from '@/lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { mysqlTableCreator } from 'drizzle-orm/mysql-core';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        const authResponse = await fetch('http://localhost:3000/api/login', {
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
