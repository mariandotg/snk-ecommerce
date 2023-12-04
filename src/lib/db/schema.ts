import {
  int,
  varchar,
  text,
  decimal,
  timestamp,
  bigint,
  mysqlTableCreator,
} from 'drizzle-orm/mysql-core';

const mysqlTable = mysqlTableCreator((name) => `snk_ecommerce_${name}`);

export const shoes = mysqlTable('shoes', {
  id: int('id').autoincrement().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const shoeImages = mysqlTable('shoeImages', {
  id: bigint('id', { mode: 'number', unsigned: true })
    .autoincrement()
    .primaryKey()
    .notNull(),
  shoeId: int('shoe_id').references(() => shoes.id),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const shoeStock = mysqlTable('shoeStock', {
  id: int('id').autoincrement().primaryKey().notNull(),
  shoeId: int('shoe_id').references(() => shoes.id),
  size: varchar('size', { length: 10 }).notNull(),
  stock: int('stock').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});
