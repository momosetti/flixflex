import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/navBar";
import { IMAGE_PATH } from "@/utils/constants";
import ModalVideo from "react-modal-video";
import { getFallbackImageLink } from "@/utils/helpers";
import DocumentHead from "@/components/documentHead";
import Image from "next/image";
import ProtectedRoute from "@/components/protectedRoute";

export default function TvDetail() {
  const [isOpen, setOpen] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const videoKeyRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;

  function findKey(arr) {
    let key = null;
    arr.forEach(function (obj) {
      switch (true) {
        case obj.site === "YouTube" && obj.official:
          key = obj.key;
          return key;
        case obj.site === "YouTube":
          key = obj.key;
          return key;
      }
    });
    return key;
  }

  useEffect(() => {
    if (id) {
      async function fetchData() {
        const data = await fetch(`/api/tv/${id}`);
        const res = await data.json();
        setMovieDetail(res);
        const movieVideoData = await fetch(`/api/tv/getTvVideo/${id}`);
        const { results } = await movieVideoData.json();
        setIsLoading(false);
        videoKeyRef.current = findKey(results);
      }
      fetchData();
    }
  }, [id]);
  if (isLoading) {
    return (
      <main>
        <div className="dank-ass-loader">
          <div className="row">
            <div className="arrow up outer outer-18"></div>
            <div className="arrow down outer outer-17"></div>
            <div className="arrow up outer outer-16"></div>
            <div className="arrow down outer outer-15"></div>
            <div className="arrow up outer outer-14"></div>
          </div>
          <div className="row">
            <div className="arrow up outer outer-1"></div>
            <div className="arrow down outer outer-2"></div>
            <div className="arrow up inner inner-6"></div>
            <div className="arrow down inner inner-5"></div>
            <div className="arrow up inner inner-4"></div>
            <div className="arrow down outer outer-13"></div>
            <div className="arrow up outer outer-12"></div>
          </div>
          <div className="row">
            <div className="arrow down outer outer-3"></div>
            <div className="arrow up outer outer-4"></div>
            <div className="arrow down inner inner-1"></div>
            <div className="arrow up inner inner-2"></div>
            <div className="arrow down inner inner-3"></div>
            <div className="arrow up outer outer-11"></div>
            <div className="arrow down outer outer-10"></div>
          </div>
          <div className="row">
            <div className="arrow down outer outer-5"></div>
            <div className="arrow up outer outer-6"></div>
            <div className="arrow down outer outer-7"></div>
            <div className="arrow up outer outer-8"></div>
            <div className="arrow down outer outer-9"></div>
          </div>
        </div>
      </main>
    );
  }
  return (
    <>
      <ProtectedRoute>
        <DocumentHead
          title={isLoading ? "Loading ..." : movieDetail.original_name}
        />
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId={videoKeyRef.current}
          onClose={() => setOpen(false)}
        />
        <NavBar />
        <div classNameName="container mx-auto py-16">
          <section classNameName="flex flex-col sm:mx-8 md:mx-0 md:flex-row md:items-start lg:justify-center">
            <section classNameName="px-20 text-center md:pr-8 md:pl-0 lg:w-2/5">
              <span
                style={{
                  boxSizing: "border-box",
                  display: "inline-block",
                  overflow: "hidden",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  position: "relative",
                  maxWidth: "100%",
                }}
              >
                <span
                  style={{
                    boxSizing: "border-box",
                    display: "block",
                    width: "initial",
                    height: "initial",
                    background: "none",
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                    maxWidth: "100%",
                  }}
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27350%27%20height=%27530%27/%3e"
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      width: "initial",
                      height: "initial",
                      background: "none",
                      opacity: 1,
                      border: 0,
                      margin: 0,
                      padding: 0,
                    }}
                  />
                </span>
                <Image
                  alt={movieDetail.original_name}
                  src={
                    movieDetail.poster_path
                      ? `${IMAGE_PATH}${movieDetail.poster_path}`
                      : getFallbackImageLink(
                          "853x1199",
                          movieDetail.original_name || ""
                        )
                  }
                  classNameName="rounded-lg"
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxSizing: "border-box",
                    padding: 0,
                    border: "none",
                    margin: "auto",
                    display: "block",
                    width: 0,
                    height: 0,
                    minWidth: "100%",
                    maxWidth: "100%",
                    minHeight: "100%",
                    maxHeight: "100%",
                  }}
                  width={600}
                  height={450}
                  loading="lazy"
                />
                <noscript />
              </span>
            </section>
            <section classNameName="md:w-3/5">
              <div classNameName="mt-6 mb-2 text-center md:mt-0 md:mb-4 md:text-left">
                <h1 classNameName="mb-1 text-3xl font-bold md:mb-3 md:text-5xl">
                  {movieDetail.original_name}{" "}
                </h1>
                <p classNameName="text-[17px] font-light">
                  {movieDetail.tagline}
                </p>
              </div>
              <div classNameName="mb-6 flex items-center justify-between text-left text-sm lg:w-10/12 lg:text-lg">
                <div>
                  <p classNameName="mb-1 text-app-placeholder">Season</p>
                  <p classNameName="text-app-pure-white">
                    {movieDetail.number_of_seasons}
                  </p>
                </div>
                <div>
                  <p classNameName="mb-1 text-app-placeholder">Episode</p>
                  <p classNameName="text-app-pure-white">
                    {movieDetail.number_of_episodes}
                  </p>
                </div>
                <div>
                  <p classNameName="mb-1 text-app-placeholder">Year</p>
                  <p classNameName="text-app-pure-white">
                    {new Date(movieDetail.first_air_date).getFullYear()}
                  </p>
                </div>
                <div>
                  <p classNameName="mb-1 text-app-placeholder">Status</p>
                  <p classNameName="text-app-pure-white">
                    {movieDetail.status}
                  </p>
                </div>
              </div>
              <div classNameName="mb-6">
                <h3 classNameName="mb-2 md:text-lg">Genres</h3>
                <ul classNameName="flex flex-wrap text-xs font-light md:text-sm">
                  {movieDetail.genres?.map((genre) => (
                    <li
                      key={genre.id}
                      classNameName="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div classNameName="mb-6">
                <h3 classNameName="mb-1 md:text-lg">Overview</h3>
                <p classNameName="font-light">{movieDetail.overview}</p>
              </div>
              <div classNameName="mb-10">
                <h3 classNameName="mb-2 md:text-lg">Casts</h3>
                <ul classNameName="flex flex-wrap text-xs md:text-sm">
                  <li className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    Default
                  </li>
                  <li className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    Default
                  </li>
                  <li className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    Default
                  </li>
                </ul>
              </div>
              <div classNameName="mb-10 flex flex-wrap">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="text-gray-900 bg-white hover:bg-primary-100 border border-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-primary-800 dark:bg-white dark:border-primary-700 dark:text-primary-900 dark:hover:bg-primary-200 mr-2 mb-2"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-4 mx-1 -ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    ></path>
                  </svg>
                  Trailer
                </button>
              </div>
            </section>
          </section>
        </div>
      </ProtectedRoute>
    </>
  );
}
