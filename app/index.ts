// src/index.ts

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { config } from 'dotenv';

import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { movie } from './db/schema'; // Assuming movie schema is imported correctly

config({ path: '.env' });

const app = new Hono();


app.get('/', (c) => {
  return c.text('Hello, this is a catalog of movies!');
});


app.get('/movie', async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  const output = await db.select().from(movie);
  return c.json(output);
});

// Endpoint to fetch a specific movie by its ID
app.get('/movie/:movieId', async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  const movieId = c.req.param('movieId');
  const output = await db
    .select()
    .from(movie)
    .where(eq(movie.id, Number(movieId)));
  
  return c.json(output);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
