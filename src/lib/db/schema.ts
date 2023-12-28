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
} from 'drizzle-orm/mysql-core';

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
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});

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
