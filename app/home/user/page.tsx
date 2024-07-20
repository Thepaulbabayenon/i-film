import { getServerSession } from "next-auth";
import { authOptions } from "@/app/db/auth";
import { getUserData } from "@/app/db/getUser"; // Adjust the import path as needed
import Image from "next/image";
import { MovieCard } from "@/app/components/MovieCard"; // Adjust the import path as needed

export default async function Profile() {
  try {
    // Fetch user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new Error("User not logged in");
    }

    // Fetch user data
    const userData = await getUserData(session?.user?.email);

    if (!userData.user) {
      return (
        <div className="recently-added-container mb-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-gray-400 text-4xl font-bold underline mt-10 px-5 sm:px-0 pt-9">
            Profile Not Found
          </h1>
          <p>User data could not be fetched. Please try again later.</p>
        </div>
        </div>
      );
    }

    return (
      <>
        <div className="recently-added-container mb-20">
          <div className="flex flex-col items-center justify-center mt-10 px-5 sm:px-0">
            <div className="flex items-center space-x-4">
              <Image
                src={userData.user.image || "/default-profile.png"}
                alt="Profile Image"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <h1 className="text-gray-400 text-4xl font-bold">{userData.user.name}</h1>
                <p className="text-gray-600">{userData.user.email}</p>
              </div>
            </div>

            {/* Watchlist */}
            <div className="mt-10">
              <h2 className="text-gray-400 text-3xl font-bold">Your Watchlist</h2>
              {userData.watchlist.length === 0 ? (
                <p>No movies in your watchlist.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6">
                  {userData.watchlist.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      age={movie.age}
                      movieId={movie.id}
                      overview={movie.overview}
                      time={movie.duration}
                      title={movie.title}
                      watchListId={movie.watchListId?.toString() ?? ''} // Handle null/undefined with default value
                      watchList={Boolean(movie.watchListId)}
                      year={movie.release}
                      youtubeUrl={movie.youtubeString}
                      ratings={0} // You might want to calculate or fetch ratings
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Top 10 Movies */}
            <div className="mt-10">
              <h2 className="text-gray-400 text-3xl font-bold">Top 10 Movies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6">
                {userData.top10.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    age={movie.age}
                    movieId={movie.id}
                    overview={movie.overview}
                    time={movie.duration}
                    title={movie.title}
                    watchListId="" // WatchListId is not relevant here, so use empty string
                    watchList={false}
                    year={movie.release}
                    youtubeUrl={movie.imageString}
                    ratings={0}
                  />
                ))}
              </div>
            </div>

            {/* Favorites */}
            <div className="mt-10">
              <h2 className="text-gray-400 text-3xl font-bold">Favorites</h2>
              {userData.favorites.length === 0 ? (
                <p>No favorites found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6">
                  {userData.favorites.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      age={movie.age}
                      movieId={movie.id}
                      overview={movie.overview}
                      time={movie.duration}
                      title={movie.title}
                      watchListId="" // WatchListId is not relevant here, so use empty string
                      watchList={false}
                      year={movie.release}
                      youtubeUrl={movie.imageString}
                      ratings={0}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return (
      <div className="recently-added-container mb-20">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-gray-400 text-4xl font-bold underline mt-10 px-5 sm:px-0 pt-9">
          Profile Error
        </h1>
        <p>There was an error loading your profile. Please try again later.</p>
      </div>
      </div>
    );
  }
}
