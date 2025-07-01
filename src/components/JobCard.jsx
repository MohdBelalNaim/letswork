import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = () => {
  const nav = useNavigate();
  return (
    <div className="bg-white p-2 border  rounded-md border-gray-300 animate__animated animate__fadeInUp">
      <div className="flex gap-4 items-center">
        <div className="size-[50px] bg-gray-300 rounded-md"></div>
        <div>
          <div className="max-sm:text-sm">
            Software Developmnet Engineer - 1
          </div>
          <div className="text-sm text-gray-500 max-sm:text-xs">
            Facebook • California, USA
          </div>
        </div>
      </div>
      <div className="flex flex-wrap text-xs gap-2 mt-3">
        <div className="bg-gray-100 rounded px-1 py-1">Direct employment</div>
        <div className="bg-gray-100 rounded px-1 py-1">Full time</div>
        <div className="bg-gray-100 rounded px-1 py-1">Remote</div>
      </div>
      <div className="font-medium mt-3 max-sm:text-sm">$20,000-$40,000</div>
      <div className="text-sm text-blue-500 flex items-center gap-2 mt-3 max-sm:text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
        Learn the skills required for this job
      </div>
      <div className="flex px-2 flex-wrap justify-between items-center text-sm mt-4 max-sm:text-xs">
        <div className="text-gray-500 ">an hour ago</div>
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 text-sm rounded cursor-pointer max-sm:text-xs mx-sm:px-1"
            onClick={() => nav("/details")}
          >
            See details
          </button>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
