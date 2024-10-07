import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { userInteractions } from '@/app/db/schema'; // Assuming this schema holds ratings

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

// Utility function for creating a standardized API response
const createResponse = (success: boolean, data: any = null, error: string | null = null) => ({
  success,
  data,
  error,
});

// Get the user rating for a specific movie
app.get('/', async (c) => {
  const movieIdStr = c.req.param('movieId');
  
  // Input validation: Check if movieId is valid (example: ensuring it's a number)
  const movieId = Number(movieIdStr);
  if (!movieId || isNaN(movieId)) {
    return c.json(createResponse(false, null, 'Invalid movie ID'), 400);
  }

  // Ensure DATABASE_URL is provided
  const databaseUrl = c.env.DATABASE_URL;
  if (!databaseUrl) {
    return c.json(createResponse(false, null, 'Database URL not configured'), 500);
  }

  try {
    // Initialize the database connection
    const sql = neon(databaseUrl);
    const db = drizzle(sql);

    // Query the user ratings from the userInteractions table
    const ratings = await db
      .select({ rating: userInteractions.ratings }) // Use the correct column name for ratings
      .from(userInteractions)
      .where(eq(userInteractions.movieId, movieId)); // Use the numeric movieId

    if (!ratings.length) {
      return c.json(createResponse(false, null, 'No user ratings found for this movie'), 404);
    }

    // If ratings exist, return them
    return c.json(createResponse(true, ratings));
  } catch (error) {
    console.error('Error fetching user rating:', error);
    return c.json(createResponse(false, null, 'Error fetching user rating'), 500);
  }
});

export default app;
