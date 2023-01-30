import React from "react";
import { IMAGE_PATH } from "@/utils/constants";
export default function ShowCard({ movieData, mediaType }) {
  return (
    <div className="card-hover-animation mb-4 grow basis-1/5 2xs:w-[130px] xs:w-full cursor-pointer">
      <a href={`/${mediaType === "tv" ? "tv-show" : "movie"}/${movieData.id}`}>
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
              <img
                alt="Puss in Boots: The Last Wish"
                src={`${IMAGE_PATH}${movieData?.backdrop_path}`}
                decoding="async"
                data-nimg="fill"
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
              />
              <noscript />
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
              <svg
                className="pl-1 text-base"
                width="1em"
                height="1em"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                  fill="#070707"
                  opacity=".75"
                />
              </svg>
              <p class=" rounded-md border-2 py-px px-2 text-[8px] font-medium uppercase tracking-wider text-app-pure-white sm:ml-4 sm:text-[10px]">
                {mediaType}
              </p>
            </div>
          </div>
          <h2 className="md:heading-xs text-ellips w-[150px] truncate text-sm font-bold capitalize text-app-pure-white sm:w-[180px] md:w-[200px] lg:w-[268px]">
            {movieData?.title || movieData?.original_name}
          </h2>
        </div>
      </a>
    </div>
  );
}
