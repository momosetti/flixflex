import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/navBar";
import ShowCard from "@/components/showCard";
import ProtectedRoute from "@/components/protectedRoute";
import DocumentHead from "@/components/documentHead";

export default function TvPage() {
  const [topTvShows, setTopTvShows] = useState(null);
  const [tvShowsData, setTvShowsData] = useState(null);
  const [popularTv, setPopluarTv] = useState(null);
  const router = useRouter();
  const { page = "1" } = router.query;
  const isNextDataLoad = useRef(true);

  const fetchData = async () => {
    if (!topTvShows) {
      // fetch the top tv only for once
      const data = await fetch("/api/tv/getTopTv");
      const res = await data.json();
      const { results } = res;
      setTopTvShows(results.slice(0, 5));
    }
    if (isNextDataLoad.current) {
      const popularTvdata = await fetch(
        `/api/tv/getPopularTv?page=${
          Number(page) - 1 >= 1 ? Number(page) - 1 : 1
        }`
      );
      const response = await popularTvdata.json();
      setTvShowsData(response.results);
      setPopluarTv(response.results.slice(0, 10));
      isNextDataLoad.current = false;
    } else {
      setPopluarTv(tvShowsData?.slice(10, 20));
      isNextDataLoad.current = true;
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <DocumentHead title="Tv Shows" />
      <NavBar />
      <ProtectedRoute>
        <div class="container mx-auto py-16">
          <>
            <div className="container py-5">
              <div class="flex items-end">
                <h1 class="text-[35px] font-light py-px sm:py-0 uppercase">
                  the 5 top TV shows
                </h1>
              </div>
              <div className="grid grid-cols-5 gap-4 my-3">
                {topTvShows?.map((topMovie) => (
                  <ShowCard
                    key={topMovie.id}
                    movieData={topMovie}
                    mediaType={"tv"}
                  />
                ))}
              </div>
            </div>
            <div id="tv-shows" className="container py-5">
              <div class="flex items-end">
                <h1 class="text-[35px] font-light py-px sm:py-0 uppercase">
                  TV shows
                </h1>
              </div>
              <div className="grid grid-cols-3 gap-4 my-3">
                {popularTv?.map((topMovie) => (
                  <ShowCard
                    key={topMovie.id}
                    movieData={topMovie}
                    mediaType={"tv"}
                  />
                ))}
              </div>
              <div className="my-16 flex items-center justify-center">
                <button
                  onClick={() => {
                    if (Number(page) - 1 === 0) return;
                    router.push(
                      `/tv-shows?page=${Number(page) - 1}`,
                      undefined,
                      { scroll: false }
                    );
                    document.getElementById("tv-shows").scrollIntoView();
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
                      fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Previous
                </button>
                <button
                  onClick={() => {
                    router.push(
                      `/tv-shows?page=${
                        Number(page) + 1 > 999 ? 1 : Number(page) + 1
                      }`, // the API limit the page number to 500
                      undefined,
                      { scroll: false }
                    );
                    document.getElementById("tv-shows").scrollIntoView();
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
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
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
