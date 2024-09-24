import { useState } from 'react';

interface Movie {
  id: number;
  title: string;
  imageString: string;
}

export function useMovieActions(initialWatchList: boolean, movieId: number) {
  const [watchList, setWatchList] = useState(initialWatchList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const handlePlay = (movieDetails: Movie) => {
    setMovie(movieDetails);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMovie(null);
  };

  const handleToggleWatchlist = async () => {
    const updatedWatchList = !watchList;
    setWatchList(updatedWatchList);

    try {
      const response = await fetch(`/api/watchlist/${movieId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: updatedWatchList ? 'add' : 'remove' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update watchlist');
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
      setWatchList(!updatedWatchList); // Rollback on error
    }
  };

  return {
    watchList,
    handlePlay,
    isModalOpen,
    closeModal,
    movie,
    handleToggleWatchlist,
  };
}
