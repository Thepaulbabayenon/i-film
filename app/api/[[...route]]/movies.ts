import { Hono } from 'hono';
import { db } from '@/app/db/drizzle';
import { movie } from '@/app/db/schema';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { eq, desc } from 'drizzle-orm';
import { authOptions } from '@/app/db/auth';
import { getServerSession } from 'next-auth';
import { sql } from 'drizzle-orm/sql';

const app = new Hono();

app.get(
  '/',
  zValidator('query', z.object({
    id: z.string().optional(),
  })),
  async (c) => {
    try {
      const req = c.req.raw;
      const session = await getServerSession({ req, ...authOptions });
      const { id } = c.req.valid('query');

      if (!session?.user?.email) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .select({
          id: movie.id,
          imageString: movie.imageString,
          title: movie.title,
          age: movie.age,
          duration: movie.duration,
          overview: movie.overview,
          release: movie.release,
          videoSource: movie.videoSource,
          category: movie.category,
          youtubeString: movie.youtubeString,
          createdAt: movie.createdAt,
          rank: movie.rank,
        })
        .from(movie)
        .where(id ? eq(movie.id, Number(id)) : undefined) 
        .orderBy(desc(movie.createdAt));

      return c.json({ data });
    } catch (error) {
      console.error('Error handling GET / route:', error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  }
);

app.delete(
  '/:id',
  zValidator('param', z.object({
    id: z.string(),
  })),
  async (c) => {
    try {
      const req = c.req.raw;
      const session = await getServerSession({ req, ...authOptions }); 
      const { id } = c.req.valid('param');

      if (!session?.user?.email) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const movieToDelete = db.$with('movie_to_delete').as(
        db.select({ id: movie.id }).from(movie)
          .where(eq(movie.id, Number(id))) 
      );

      const [data] = await db
        .with(movieToDelete)
        .delete(movie)
        .where(
          eq(movie.id, sql`(select id from movie_to_delete)`) 
        )
        .returning({
          id: movie.id,
        });

      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      return c.json({ data });
    } catch (error) {
      console.error('Error handling DELETE /:id route:', error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  }
);

export default app;


app.onError((err, c) => {
  console.error('Unhandled Error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});
