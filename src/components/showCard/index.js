import React from "react";
import { IMAGE_PATH } from "@/utils/constants";
import { getFallbackImageLink, shimmer, toBase64 } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";

export default function ShowCard({ movieData, mediaType }) {
  return (
    <div className="card-hover-animation mb-4 grow basis-1/5 2xs:w-[130px] xs:w-full cursor-pointer">
      <Link
        href={`/${mediaType === "tv" ? "tv-show" : "movie"}/${movieData.id}`}
      >
        <div className="relative w-full rounded-lg">
          <div className="relative h-[133px] md:h-[140px] lg:h-[174px]">
            <span
              style={{
                boxSizing: "border-box",
                display: "block",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                position: "absolute",
                inset: 0,
              }}
            >
              <Image
                src={
                  movieData.backdrop_path
                    ? `${IMAGE_PATH}${movieData?.backdrop_path}`
                    : getFallbackImageLink(
                        "1920x1080",
                        movieData?.title || movieData?.original_name
                      )
                }
                alt={movieData?.title || movieData?.original_name}
                className="rounded-lg"
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
                  objectFit: "cover",
                }}
                width={600}
                height={450}
                loading="lazy"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(600, 450)
                )}`}
              />
            </span>
          </div>
        </div>
        <div>
          <div className="mt-2 mb-1 flex text-[11px] font-light text-app-grey md:text-[13px]">
            <p>
              {new Date(
                movieData.release_date || movieData.first_air_date
              ).getFullYear()}
            </p>
            <div className='flex items-center px-[6px] before:content-["•"]'>
              <span class="uppercase ml-2 bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                {mediaType}
              </span>
            </div>
          </div>
          <h2 className="md:heading-xs text-ellips w-[150px] truncate text-sm font-bold capitalize text-app-pure-white sm:w-[180px] md:w-[200px] lg:w-[268px]">
            {movieData?.title || movieData?.original_name}
          </h2>
        </div>
      </Link>
    </div>
  );
}
