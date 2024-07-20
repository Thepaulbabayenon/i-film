"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db/drizzle";
import { getServerSession } from "next-auth";
import { authOptions } from "./db/auth";
import { watchLists } from "./db/schema";
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID for generating unique IDs

// Custom form data types
interface AddToWatchlistFormData {
  movieId: string;
  pathname: string;
}

interface DeleteFromWatchlistFormData {
  watchlistId: string;
  pathname: string;
}

// Function to add a movie to the watchlist
export async function addToWatchlist(formData: FormData) {
  try {
    const movieId = formData.get("movieId") as string;
    const pathname = formData.get("pathname") as string;
    const session = await getServerSession(authOptions);

    if (!movieId || !session?.user?.email) {
      throw new Error("Invalid formData or session");
    }

    const newEntry = {
      id: uuidv4(), // Generating a unique ID
      userId: session.user.email as string,
      movieId: Number(movieId),
    };

    // Insert the new entry into the watchList table using Drizzle ORM
    const result = await db.insert(watchLists).values(newEntry).returning();

    revalidatePath(pathname);
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

// Function to delete a movie from the watchlist
export async function deleteFromWatchlist(formData: FormData) {
  try {
    const watchlistId = formData.get("watchlistId") as string;
    const pathname = formData.get("pathname") as string;

    if (!watchlistId) {
      throw new Error("Invalid watchlistId");
    }

    // Delete the entry from the watchList table using Drizzle ORM
    const data = await db.delete(watchLists)
      .where(eq(watchLists.id, watchlistId))
      .returning();

    revalidatePath(pathname);
  } catch (error) {
    console.error("Error deleting movie from watchlist:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
