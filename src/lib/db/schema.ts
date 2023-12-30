import { relations } from 'drizzle-orm';
import {
  int,
  varchar,
  text,
  decimal,
  timestamp,
  bigint,
  mysqlTableCreator,
  serial,
  primaryKey,
} from 'drizzle-orm/mysql-core';
import { AdapterAccount } from 'next-auth/adapters';

const mysqlTable = mysqlTableCreator((name) => `snk_ecommerce_${name}`);

export const shoes = mysqlTable('shoes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const shoeImages = mysqlTable('shoeImages', {
  id: serial('id').primaryKey(),
  shoeId: int('shoe_id'),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const shoeStock = mysqlTable('shoeStock', {
  id: serial('id').primaryKey(),
  shoeId: int('shoe_id'),
  size: varchar('size', { length: 10 }).notNull(),
  stock: int('stock').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const users = mysqlTable('users', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    fsp: 3,
  }).defaultNow(),
  image: varchar('image', { length: 255 }),
});

export const accounts = mysqlTable(
  'account',
  {
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: varchar('access_token', { length: 255 }),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: varchar('id_token', { length: 2048 }),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = mysqlTable('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = mysqlTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const shoesRelations = relations(shoes, ({ many }) => ({
  shoeImages: many(shoeImages),
  shoeStock: many(shoeStock),
}));

export const shoeImagesRelations = relations(shoeImages, ({ one }) => ({
  shoe: one(shoes, {
    fields: [shoeImages.shoeId],
    references: [shoes.id],
  }),
}));

export const shoeStockRelations = relations(shoeStock, ({ one }) => ({
  shoe: one(shoes, {
    fields: [shoeStock.shoeId],
    references: [shoes.id],
  }),
}));
