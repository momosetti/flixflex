import { useEffect, useState } from "react";
import NavBar from "@/components/navBar";
import ShowCard from "@/components/showCard";
import ProtectedRoute from "@/components/protectedRoute";
import DocumentHead from "@/components/documentHead";
import Loader from "@/components/loader";
export default function TvPage() {
  const [topMovies, setTopMovie] = useState(null);
  const [popularTv, setPopluarTv] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("/api/tv/getTopTv");
      const res = await data.json();
      const { results } = res;
      setTopMovie(results.slice(0, 5));
      const PopularTvdata = await fetch("/api/tv/getPopularTv");
      const reponse = await PopularTvdata.json();
      setIsLoading(false);
      setPopluarTv(reponse.results.slice(0, 10));
    }
    fetchData();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <DocumentHead title={"Tv Shows"} />
      <NavBar />
      <ProtectedRoute>
        <div class="container mx-auto py-16">
          <div className="container py-5">
            <div class="flex items-end">
              <h1 class="text-[35px] font-light py-px sm:py-0 uppercase">
                the 5 top TV shows
              </h1>
            </div>
            <div className="grid grid-cols-3 gap-4 my-3">
              {topMovies?.map((topMovie) => (
                <ShowCard
                  key={topMovie.id}
                  movieData={topMovie}
                  mediaType={"tv"}
                />
              ))}
            </div>
          </div>
          <div className="container py-5">
            <div class="flex items-end">
              <h1 class="text-[35px] font-light py-px sm:py-0 uppercase">
                TV shows
              </h1>
            </div>
            <div className="grid grid-cols-5 gap-4 my-3">
              {popularTv?.map((topMovie) => (
                <ShowCard
                  key={topMovie.id}
                  movieData={topMovie}
                  mediaType={"tv"}
                />
              ))}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}
