import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import CircularProgress from "./Progress";
import Footer from "./Footer";
const Main = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="max-sm:px-1">
      <div className="max-lg:hidden bg-white rounded-lg border border-gray-300 px-5 py-6 flex items-center justify-between">
        <div>
          <div className="text-sm flex items-center gap-3">
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
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            Friday, June 6
          </div>
          <div className="text-xl mt-3">Hi, Mohd Belal Naim !</div>
          <div className="text-sm mt-3">Let's get done with the basics</div>
          <div className="flex gap-2 mt-2">
            <div className="cursor-pointer flex items-center gap-2 px-2 rounded-full py-1 text-sm text-gray-600 border border-gray-300 hover:bg-blue-100 hover:text-blue-500">
              Update your profile
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <div className="cursor-pointer flex items-center gap-2 px-2 rounded-full py-1 text-sm text-gray-600 border border-gray-300 hover:bg-blue-100 hover:text-blue-500">
              Create resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm mb-2">Profile completion</div>
          <div className="size-20">
            <CircularProgress percent={76} size={96}/>
          </div>
        </div>
      </div>

      <div className="lg:hidden bg-white rounded-lg border border-gray-300 px-5 py-4 grid gap-y-2 mb-1">
        <div className="text-xs flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          Friday, June 6
        </div>
        <div>Hi, Mohd Belal Naim</div>
        <div>
          <div className="w-full h-1 bg-gray-200 rounded-full">
            <div className="w-[76%] h-1 bg-blue-500 rounded-full"></div>
          </div>
        </div>
        <div className="text-xs text-blue-500">76% complete</div>
      </div>
      <div className="lg:hidden text-sm py-3 font-medium px-2 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
        Jobs curated for you
      </div>
      <div
        className={`flex justify-between items-center py-4 z-[999] sticky top-0 max-sm:hidden ${
          isScrolled ? "bg-white shadow" : "bg-transparent"
        } ${isScrolled ? "px-3" : ""}`}
      >
        <div className="text-sm">
          <span className=" font-bold">8,562</span> Jobs found
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div>Sort By</div>
          <select
            name=""
            id=""
            className="bg-white tex-sm border border-gray-300 px-2 py-1 rounded"
          >
            <option>Newest Post</option>
          </select>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
      {/* <div>
      <Footer/>  
      </div> */}
    </div>

  );
};

export default Main;
