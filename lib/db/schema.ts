import {
  sqliteTable,
  integer,
  text,
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('member'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;  


export const books = sqliteTable('books', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  googleBookId: text('google_book_id'),
  title: text('title').notNull(),
  authors: text('authors'), // JSON string
  description: text('description'),
  coverUrl: text('cover_url'),
  isbn: text('isbn'),
  status: text('status').notNull().default('want_to_read'),
  rating: integer('rating'),
  readAt: integer('read_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const booksRelations = relations(books, ({ one }) => ({
  user: one(users, {
    fields: [books.userId],
    references: [users.id],
  }),
}));


export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;
