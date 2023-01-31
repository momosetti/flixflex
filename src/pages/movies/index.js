import { useEffect, useState } from "react";
import NavBar from "@/components/navBar";
import ShowCard from "@/components/showCard";
import ProtectedRoute from "@/components/protectedRoute";
export default function TopMoviesPage() {
  const [topMovies, setTopMovie] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data = await fetch("/api/movie/getTopMovies");
      const res = await data.json();
      const { results } = res;
      setTopMovie(results.slice(0, 5));
    }
    fetchData();
  }, []);
  return (
    <>
      <NavBar />
      <ProtectedRoute>
        <div class="container mx-auto py-16">
          <div className="container py-5">
            <div class="flex items-end">
              <h1 class="text-[20px] font-bold py-px sm:py-0 uppercase">
                the 5 top movies
              </h1>
            </div>
            <div className="grid grid-cols-4 gap-4 my-3">
              {topMovies?.map((topMovie) => (
                <ShowCard
                  key={topMovie.id}
                  movieData={topMovie}
                  mediaType={"movie"}
                />
              ))}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}
