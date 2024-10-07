"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle, Star } from "lucide-react";
import PlayVideoModal from "./PlayVideoModal";
import axios from "axios";
import { usePathname } from "next/navigation";

interface MovieCardProps {
  movieId: number;
  overview: string;
  title: string;
  watchList: boolean;
  watchListId?: string;
  youtubeUrl: string;
  year: number;
  age: number;
  time: number;
  ratings: number; // External ratings (initial ratings)
}

export function MovieCard({
  movieId,
  overview,
  title,
  watchList: initialWatchList,
  watchListId,
  youtubeUrl,
  year,
  age,
  time,
  ratings: initialRatings,
}: MovieCardProps) {
  const [open, setOpen] = useState(false);
  const [watchList, setWatchList] = useState(initialWatchList);
  const [userRating, setUserRating] = useState<number>(initialRatings); // This will be updated based on backend data
  const pathName = usePathname();

  // Fetch user rating from the backend when the component mounts
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}/user-rating`);
        // If the API returns a valid rating, use it; otherwise, fallback to initialRatings
        if (response.data && response.data.rating !== undefined) {
          setUserRating(response.data.rating);
        } else {
          setUserRating(initialRatings);
        }
      } catch (error) {
        console.error("Error fetching rating from the database:", error);
        setUserRating(initialRatings); // Fallback to initial rating in case of error
      }
    };

    fetchRating();
  }, [movieId, initialRatings]);

  // Save user rating to the userInteractions table when userRating changes
  useEffect(() => {
    const saveUserInteraction = async () => {
      try {
        await axios.post(`/api/movies/${movieId}/user-rating`, {
          userId: "currentUserId", // Replace with actual user ID
          movieId,
          ratings: userRating,
        });
      } catch (error) {
        console.error("Error saving user interaction:", error);
      }
    };

    // Only save if the user rating has changed
    if (userRating !== initialRatings) {
      saveUserInteraction();
    }
  }, [userRating, initialRatings, movieId]);

  // Handle watchlist toggle
  const handleToggleWatchlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("movieId", movieId.toString());
    formData.append("pathname", pathName);

    if (watchList) {
      formData.append("watchlistId", watchListId || "");
      await deleteFromWatchlist(formData);
      setWatchList(false);
    } else {
      await addToWatchlist(formData);
      setWatchList(true);
    }
  };

  // Handle rating toggle
  const handleRatingClick = async (newRating: number) => {
    setUserRating(newRating);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="-mt-14">
        <PlayCircle className="h-20 w-20" />
      </button>

      <div className="right-5 top-5 absolute z-10">
        <Button variant="outline" size="icon" onClick={handleToggleWatchlist}>
          <Heart className={`w-4 h-4 ${watchList ? 'text-red-500' : ''}`} />
        </Button>
      </div>

      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{year}</p>
          <p className="font-normal border py-0.5 px-1 border-gray-200 rounded text-sm">
            {age}+
          </p>
          <p className="font-normal text-sm">{time}m</p>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 cursor-pointer ${
                  userRating >= star ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
        </div>
        <p className="line-clamp-1 text-sm text-gray-200 font-light">
          {overview}
        </p>
      </div>

      <PlayVideoModal
        youtubeUrl={youtubeUrl}
        key={movieId}
        title={title}
        overview={overview}
        state={open}
        changeState={setOpen}
        age={age}
        duration={time}
        release={year}
        ratings={userRating}
        setUserRating={setUserRating}
      />
    </>
  );
}

// API functions for watchlist actions
export const addToWatchlist = async (formData: FormData) => {
  const userId = "currentUserId"; // Replace with actual user ID logic
  const movieId = parseInt(formData.get('movieId') as string);

  await axios.post('/api/watchlist', {
    movieId,
    userId,
  });
};

export const deleteFromWatchlist = async (formData: FormData) => {
  const userId = "currentUserId"; // Replace with actual user ID logic
  const movieId = parseInt(formData.get('movieId') as string);
  const watchlistId = formData.get('watchlistId') as string;

  await axios.delete('/api/watchlist', {
    data: {
      movieId,
      userId,
      watchlistId,
    },
  });
};
