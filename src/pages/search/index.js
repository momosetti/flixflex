import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NavBar from "@/components/navBar";
import ProtectedRoute from "@/components/protectedRoute";
import axios from "axios";
import DocumentHead from "@/components/documentHead";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";

const DynamicShowCard = dynamic(() => import("@/components/showCard"));
export default function SearchPage() {
  const [searchResult, setSearchResult] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { q, page = "1" } = router.query;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/search?q=${q}&page=${page}`);
      setIsLoading(false);
      setSearchResult(response.data);
    }
    fetchData();
  }, [page, q]);
  return (
    <>
      <ProtectedRoute>
        <DocumentHead title={`Search`} />
        <NavBar />
        <div className="container mx-auto mt-[2em]">
          <div className="flex items-end">
            <h1 className="text-[20px] font-bold py-px sm:py-0 text-light">
              We find {searchResult?.total_results} results for your search
            </h1>
          </div>
          <div className="grid grid-cols-4 gap-4 my-3">
            {isLoading ? (
              <Loader />
            ) : (
              searchResult?.results?.map((show) =>
                show.media_type !== "person" ? (
                  <DynamicShowCard
                    key={show.id}
                    movieData={show}
                    mediaType={show.media_type}
                  />
                ) : null
              )
            )}
            {}
          </div>
          <div className="my-16 flex items-center justify-center">
            <Link
              onClick={() => {
                if (Number(page) > 1) setIsLoading(true);
              }}
              href={
                Number(page) > 1
                  ? `/search?q=${q}&page=${Number(page) - 1}`
                  : "#"
              }
              className={`inline-flex ${
                page === "1" ? "cursor-not-allowed" : null
              } items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
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
            </Link>
            <Link
              onClick={() => {
                if (page < searchResult?.total_pages) setIsLoading(true);
              }}
              href={
                page < searchResult?.total_pages
                  ? `/search?q=${q}&page=${Number(page) + 1}`
                  : "#"
              }
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}
