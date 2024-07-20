import { db } from "@/app/db/drizzle";
import { users, watchLists, movie, userInteractions } from "@/app/db/schema";
import { desc, eq, and } from "drizzle-orm";

export async function getUserData(userId: string) {
  // Log the userId for debugging
  console.log("Fetching data for user ID:", userId);

  // Fetch user data
  const userData = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (userData.length === 0) {
    throw new Error("User not found");
  }

  // Fetch watchlist data
  const watchlistData = await db
    .select({
      title: movie.title,
      age: movie.age,
      duration: movie.duration,
      imageString: movie.imageString,
      overview: movie.overview,
      release: movie.release,
      id: movie.id,
      youtubeString: movie.youtubeString,
      watchListId: watchLists.id,
    })
    .from(movie)
    .leftJoin(watchLists, eq(movie.id, watchLists.movieId))
    .where(eq(watchLists.userId, userId));

  // Fetch top 10 movies
  const top10Data = await db
    .select({
      title: movie.title,
      age: movie.age,
      duration: movie.duration,
      imageString: movie.imageString,
      overview: movie.overview,
      release: movie.release,
      id: movie.id,
    })
    .from(movie)
    .orderBy(desc(movie.release))
    .limit(10);

  // Fetch favorites
  const favoritesData = await db
    .select({
      title: movie.title,
      age: movie.age,
      duration: movie.duration,
      imageString: movie.imageString,
      overview: movie.overview,
      release: movie.release,
      id: movie.id,
    })
    .from(movie)
    .leftJoin(userInteractions, eq(movie.id, userInteractions.movieId))
    .where(and(
      eq(userInteractions.userId, userId),
      eq(userInteractions.rating, 5)
    ));

  return {
    user: userData[0] || null,
    watchlist: watchlistData,
    top10: top10Data,
    favorites: favoritesData,
  };
}
