import Image from "next/image";
import { db } from "../db/drizzle";
import { MovieCard } from "./MovieCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../db/auth";
import { and, asc, desc, eq, inArray, max } from "drizzle-orm";
import { accounts, movie, users } from "../db/schema";

const result = db.select().from(users).leftJoin(movie, eq(users.id, movie.id));

async function getData(userId: string) {
  const data = await db
    .select({
      id: movie.id,
      overview: movie.overview,
      title: movie.title,
      WatchList: {
        userId: accounts.userId,
        movieId: movie.id,
      },
      imageString: movie.imageString,
      youtubeString: movie.youtubeString,
      age: movie.age,
      release: movie.release,
      duration: movie.duration,
    })
    .from(movie)
    .leftJoin(accounts, eq(accounts.userId, userId)) 
    .orderBy(asc(movie.rank))
    .limit(4);

  return data;
}

export default async function RecentlyAdded() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return <div>No user session found</div>;
  }

  const data = await getData(session.user.email as string);

  return (
    <div className="recently-added-container mb-20"> {/* Add margin-bottom to this container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
        {data.map((movie) => (
          <div key={movie.id} className="relative h-48">
            <Image
              src={movie.imageString}
              alt="Movie"
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover"
            />

            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
                <Image
                  src={movie.imageString}
                  alt="Movie"
                  width={800}
                  height={800}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />

                <MovieCard
                  movieId={movie.id}
                  overview={movie.overview}
                  title={movie.title}
                  watchListId={movie.WatchList?.movieId.toString() || ""}
                  youtubeUrl={movie.youtubeString}
                  watchList={movie.WatchList?.userId ? parseInt(movie.WatchList.userId, 10) > 0 : false} 
                  key={movie.id}
                  age={movie.age}
                  time={movie.duration}
                  year={movie.release}
                  ratings={0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
