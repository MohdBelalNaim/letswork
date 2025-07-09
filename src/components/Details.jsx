import React from "react";
import JobCard from "./JobCard";

import { useEffect } from "react";

const Details = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-6">
      {/* Job Detail Card */}
      <div className="grid gap-y-4 bg-white border border-gray-300 rounded-md p-4 md:p-6">
        <div className="text-lg font-bold flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Software Development Engineer - 1
        </div>

        <div className="text-sm text-gray-500 max-sm:text-xs">
          Facebook • California, USA
        </div>

        <div className="text-sm text-gray-700 max-w-full md:max-w-[60%] max-sm:text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          quam voluptatum odio nulla perspiciatis reprehenderit totam animi cum
          possimus, dolores ab dicta esse ducimus deserunt! Ullam harum fugit
          doloribus similique. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Doloribus, quam voluptatum odio nulla perspiciatis
          reprehenderit totam animi cum possimus, dolores ab dicta esse ducimus
          deserunt! Ullam harum fugit doloribus similique.
        </div>

        <div className="font-bold max-sm:text-sm">$20,000 - $40,000</div>

        <div className="border-t border-gray-300 pt-4">
          <div className="py-2 text-sm font-medium max-sm:text-xs">Required Skills</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {["React", "Tailwind", "JS", "CSS", "HTML", "MongoDB", "SQL"].map(
              (skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 px-2 py-1 rounded-md text-gray-800 max-sm:text-xs"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button className="max-sm:text-xs text-sm bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
            Apply now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
          </button>

          <button className="max-sm:text-xs text-sm bg-gray-200 px-4 py-2 rounded flex items-center gap-2">
            Share this job
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Similar Jobs */}
      <div>
        <div className="text-lg font-semibold mb-2">Similar Jobs</div>
        <div className="grid grid-cols-1  sm:grid-cols-2 gap-2">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
    </div>
  );
};

export default Details;
