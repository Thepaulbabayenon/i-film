import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  doublePrecision,
  primaryKey,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { AdapterAccount } from "next-auth/adapters";
import z from "zod"

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: varchar("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  isAdmin: boolean("isAdmin").default(false), 
});


export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const movie = pgTable('movie', {
  id: serial('id').primaryKey(),
  imageString: varchar('imageString').notNull(),
  title: varchar('title').notNull(),
  age: integer('age').notNull(),
  duration: doublePrecision('duration').notNull(),
  overview: text('overview').notNull(),
  release: integer('release').notNull(),
  videoSource: varchar('videoSource').notNull(),
  category: varchar('category').notNull(),
  youtubeString: varchar('youtubeString').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  rank: integer('rank').notNull()
});

export const userInteractions = pgTable('userInteractions', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull().references(() => users.id),
  movieId: integer('movieId').notNull().references(() => movie.id),
  rating: integer('rating').notNull(), 
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

export const watchLists = pgTable('watchLists', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  movieId: integer('movieId').notNull().references(() => movie.id),
  isFavorite: boolean('isFavorite').default(false), 
});

export const insertMovieSchema = z.object({
  imageString: z.string().min(1),
  title: z.string().min(1),
  age: z.number().int().positive(),
  duration: z.number().positive(),
  overview: z.string().min(1),
  release: z.number().int().positive(),
  videoSource: z.string().min(1),
  category: z.string().min(1),
  youtubeString: z.string().min(1),
  rank: z.number().int().positive(),
});

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));


export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));


export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  authenticators: many(authenticators),
  watchLists: many(watchLists),
}));


export const movieRelations = relations(movie, ({ many }) => ({
  watchLists: many(watchLists),
}));


export const userInteractionRelations = relations(userInteractions, ({ one }) => ({
  user: one(users, {
    fields: [userInteractions.userId],
    references: [users.id],
  }),
  movie: one(movie, {
    fields: [userInteractions.movieId],
    references: [movie.id],
  }),
}));


export const watchListRelations = relations(watchLists, ({ one }) => ({
  movie: one(movie, {
    fields: [watchLists.movieId],
    references: [movie.id],
  }),
  user: one(users, {
    fields: [watchLists.userId],
    references: [users.id],
  }),
}));


export const authenticatorRelations = relations(authenticators, ({ one }) => ({
  user: one(users, {
    fields: [authenticators.userId],
    references: [users.id],
  }),
}));
