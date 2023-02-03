import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/navBar";
import ShowCard from "@/components/showCard";
import ProtectedRoute from "@/components/protectedRoute";
import DocumentHead from "@/components/documentHead";

export default function MoviesPage() {
  const [topMovies, setTopMovie] = useState(null);
  const [popularMovie, setPopluarMovie] = useState(null);
  const [moviesData, setMoviesData] = useState(null);
  const router = useRouter();
  const { page = "1" } = router.query;
  const isNextDataLoad = useRef(true);

  const fetchData = async () => {
    if (!topMovies) {
      // fetch the top movies only for once
      const data = await fetch("/api/movie/getTopMovies");
      const res = await data.json();
      const { results } = res;
      setTopMovie(results.slice(0, 5));
    }
    if (isNextDataLoad.current) {
      const popularMovieData = await fetch(
        `/api/movie/getPopularMovie?page=${
          Number(page) - 1 >= 1 ? Number(page) - 1 : 1
        }`
      );
      const response = await popularMovieData.json();
      setMoviesData(response.results);
      setPopluarMovie(response.results.slice(0, 10));
      isNextDataLoad.current = false;
    } else {
      setPopluarMovie(moviesData?.slice(10, 20));
      isNextDataLoad.current = true;
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <DocumentHead title="Movies" />
      <NavBar />
      <ProtectedRoute>
        <div className="container mx-auto py-16">
          <>
            <div className="container py-5">
              <div className="flex items-end">
                <h1 className="text-[35px] font-light py-px sm:py-0 uppercase">
                  the 5 top movie
                </h1>
              </div>
              <div className="grid grid-cols-5 gap-4 my-3">
                {topMovies?.map((topMovie) => (
                  <ShowCard
                    key={topMovie.id}
                    movieData={topMovie}
                    mediaType={"movie"}
                  />
                ))}
              </div>
            </div>
            <div id="movies" className="container py-5">
              <div className="flex items-end">
                <h1 className="text-[35px] font-light py-px sm:py-0 uppercase">
                  Movies
                </h1>
              </div>
              <div className="grid grid-cols-3 gap-4 my-3">
                {popularMovie?.map((topMovie) => (
                  <ShowCard
                    key={topMovie.id}
                    movieData={topMovie}
                    mediaType={"movie"}
                  />
                ))}
              </div>
              <div className="my-16 flex items-center justify-center">
                <button
                  onClick={() => {
                    if (Number(page) - 1 === 0) return;
                    router.push(`/movies?page=${Number(page) - 1}`, undefined, {
                      scroll: false,
                    });
                    document.getElementById("movies").scrollIntoView();
                  }}
                  className={`${
                    page === "1" ? "cursor-not-allowed" : null
                  } inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-primary-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Previous
                </button>
                <button
                  onClick={() => {
                    router.push(
                      `/movies?page=${
                        Number(page) + 1 > 999 ? 1 : Number(page) + 1
                      }`, // the API limit the page number to 500
                      undefined,
                      { scroll: false }
                    );
                    document.getElementById("movies").scrollIntoView();
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-primary-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </>
        </div>
      </ProtectedRoute>
    </>
  );
}
