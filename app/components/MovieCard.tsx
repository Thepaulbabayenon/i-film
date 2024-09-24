"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle } from "lucide-react";
import PlayVideoModal from "./PlayVideoModal";
import { addToWatchlist, deleteFromWatchlist } from "../action";
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
  ratings: number; // Add ratings prop here
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
  ratings,
}: MovieCardProps) {
  const [open, setOpen] = useState(false);
  const [watchList, setWatchList] = useState(initialWatchList);
  const pathName = usePathname();

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
          <p className="font-normal text-sm">⭐ {ratings}</p> {/* Display ratings here */}
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
        ratings={ratings}/>
    </>
  );
}
