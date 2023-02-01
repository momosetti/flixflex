import { useEffect, useState } from "react";
import NavBar from "@/components/navBar";
import ShowCard from "@/components/showCard";
import ProtectedRoute from "@/components/protectedRoute";
import DocumentHead from "@/components/documentHead";
import Loader from "@/components/loader";
export default function MoviesPage() {
  const [topMovies, setTopMovie] = useState(null);
  const [popularMovie, setPopluarMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("/api/movie/getTopMovies");
      const res = await data.json();
      const { results } = res;
      setTopMovie(results);
      const PopularMoviedata = await fetch("/api/movie/getPopularMovie");
      const reponse = await PopularMoviedata.json();
      setIsLoading(false);
      setPopluarMovie(reponse.results.slice(0, 10));
    }
    fetchData();
  }, []);

  return (
    <>
      <DocumentHead title={"Movies"} />
      <NavBar />
      <ProtectedRoute>
        <div class="container mx-auto py-16">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="container py-5">
                <div class="flex items-end">
                  <h1 class="text-[35px] font-light py-px sm:py-0 uppercase">
                    the 5 top movie
                  </h1>
                </div>
                <div className="grid grid-cols-3 gap-4 my-3">
                  {topMovies?.slice(0, 5).map((topMovie) => (
                    <ShowCard
                      key={topMovie.id}
                      movieData={topMovie}
                      mediaType={"movie"}
                    />
                  ))}
                </div>
              </div>
              <div className="container py-5">
                <div class="flex items-end">
                  <h1 class="text-[35px] font-light py-px sm:py-0 uppercase">
                    Movies
                  </h1>
                </div>
                <div className="grid grid-cols-5 gap-4 my-3">
                  {popularMovie?.map((topMovie) => (
                    <ShowCard
                      key={topMovie.id}
                      movieData={topMovie}
                      mediaType={"movie"}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </ProtectedRoute>
    </>
  );
}
