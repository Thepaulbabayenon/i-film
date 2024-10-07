import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { userInteractions } from '@/app/db/schema'; // Assuming this schema holds ratings

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

// Standardized API response structure
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Utility function for creating a standardized API response
const createResponse = <T>(success: boolean, data?: T, error?: string): ApiResponse<T> => ({
  success,
  data,
  error,
});

// Initialize database connection
const initializeDb = (databaseUrl: string) => {
  const sql = neon(databaseUrl);
  return drizzle(sql);
};

// Get the user rating for a specific movie
app.get('/api/movies/:movieId/user-rating', async (c) => {
  const movieIdStr = c.req.param('movieId');

  // Input validation: Check if movieId is valid (ensure it's a number)
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
    const db = initializeDb(databaseUrl);

    // Query the user ratings from the userInteractions table
    const ratings = await db
      .select({ rating: userInteractions.ratings })
      .from(userInteractions)
      .where(eq(userInteractions.movieId, movieId));

    if (ratings.length === 0) {
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
