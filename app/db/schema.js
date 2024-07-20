"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchListRelations = exports.movieRelations = exports.userRelations = exports.sessionRelations = exports.accountRelations = exports.watchLists = exports.movie = exports.authenticators = exports.verificationTokens = exports.sessions = exports.accounts = exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.text)("id")
        .primaryKey()
        .$defaultFn(function () { return crypto.randomUUID(); }),
    name: (0, pg_core_1.text)("name"),
    email: (0, pg_core_1.text)("email").notNull(),
    emailVerified: (0, pg_core_1.timestamp)("emailVerified", { mode: "date" }),
    image: (0, pg_core_1.text)("image"),
});
exports.accounts = (0, pg_core_1.pgTable)("account", {
    userId: (0, pg_core_1.text)("userId")
        .notNull()
        .references(function () { return exports.users.id; }, { onDelete: "cascade" }),
    type: (0, pg_core_1.text)("type").$type().notNull(),
    provider: (0, pg_core_1.text)("provider").notNull(),
    providerAccountId: (0, pg_core_1.text)("providerAccountId").notNull(),
    refresh_token: (0, pg_core_1.text)("refresh_token"),
    access_token: (0, pg_core_1.text)("access_token"),
    expires_at: (0, pg_core_1.integer)("expires_at"),
    token_type: (0, pg_core_1.text)("token_type"),
    scope: (0, pg_core_1.text)("scope"),
    id_token: (0, pg_core_1.text)("id_token"),
    session_state: (0, pg_core_1.text)("session_state"),
}, function (account) { return ({
    compoundKey: (0, pg_core_1.primaryKey)({
        columns: [account.provider, account.providerAccountId],
    }),
}); });
exports.sessions = (0, pg_core_1.pgTable)("session", {
    sessionToken: (0, pg_core_1.text)("sessionToken").primaryKey(),
    userId: (0, pg_core_1.text)("userId")
        .notNull()
        .references(function () { return exports.users.id; }, { onDelete: "cascade" }),
    expires: (0, pg_core_1.timestamp)("expires", { mode: "date" }).notNull(),
});
exports.verificationTokens = (0, pg_core_1.pgTable)("verificationToken", {
    identifier: (0, pg_core_1.text)("identifier").notNull(),
    token: (0, pg_core_1.text)("token").notNull(),
    expires: (0, pg_core_1.timestamp)("expires", { mode: "date" }).notNull(),
}, function (verificationToken) { return ({
    compositePk: (0, pg_core_1.primaryKey)({
        columns: [verificationToken.identifier, verificationToken.token],
    }),
}); });
exports.authenticators = (0, pg_core_1.pgTable)("authenticator", {
    credentialID: (0, pg_core_1.text)("credentialID").notNull().unique(),
    userId: (0, pg_core_1.text)("userId")
        .notNull()
        .references(function () { return exports.users.id; }, { onDelete: "cascade" }),
    providerAccountId: (0, pg_core_1.text)("providerAccountId").notNull(),
    credentialPublicKey: (0, pg_core_1.text)("credentialPublicKey").notNull(),
    counter: (0, pg_core_1.integer)("counter").notNull(),
    credentialDeviceType: (0, pg_core_1.text)("credentialDeviceType").notNull(),
    credentialBackedUp: (0, pg_core_1.boolean)("credentialBackedUp").notNull(),
    transports: (0, pg_core_1.text)("transports"),
}, function (authenticator) { return ({
    compositePK: (0, pg_core_1.primaryKey)({
        columns: [authenticator.userId, authenticator.credentialID],
    }),
}); });
exports.movie = (0, pg_core_1.pgTable)('movie', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    imageString: (0, pg_core_1.varchar)('imageString').notNull(),
    title: (0, pg_core_1.varchar)('title').notNull(),
    age: (0, pg_core_1.integer)('age').notNull(),
    duration: (0, pg_core_1.doublePrecision)('duration').notNull(),
    overview: (0, pg_core_1.text)('overview').notNull(),
    release: (0, pg_core_1.integer)('release').notNull(),
    videoSource: (0, pg_core_1.varchar)('videoSource').notNull(),
    category: (0, pg_core_1.varchar)('category').notNull(),
    youtubeString: (0, pg_core_1.varchar)('youtubeString').notNull(),
    createdAt: (0, pg_core_1.timestamp)('createdAt').defaultNow().notNull(),
});
exports.watchLists = (0, pg_core_1.pgTable)('watchLists', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    userId: (0, pg_core_1.text)('userId').notNull(),
    movieId: (0, pg_core_1.integer)('movieId').references(function () { return exports.movie.id; }),
});
exports.accountRelations = (0, drizzle_orm_1.relations)(exports.accounts, function (_a) {
    var one = _a.one;
    return ({
        user: one(exports.users, {
            fields: [exports.accounts.userId],
            references: [exports.users.id],
        }),
    });
});
exports.sessionRelations = (0, drizzle_orm_1.relations)(exports.sessions, function (_a) {
    var one = _a.one;
    return ({
        user: one(exports.users, {
            fields: [exports.sessions.userId],
            references: [exports.users.id],
        }),
    });
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.users, function (_a) {
    var many = _a.many;
    return ({
        accounts: many(exports.accounts),
        sessions: many(exports.sessions),
    });
});
exports.movieRelations = (0, drizzle_orm_1.relations)(exports.movie, function (_a) {
    var many = _a.many;
    return ({
        watchLists: many(exports.watchLists),
    });
});
exports.watchListRelations = (0, drizzle_orm_1.relations)(exports.watchLists, function (_a) {
    var one = _a.one;
    return ({
        movie: one(exports.movie, {
            fields: [exports.watchLists.movieId],
            references: [exports.movie.id],
        }),
    });
});
