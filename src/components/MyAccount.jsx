import React from "react";
import avatar from "../assets/avatar.png";
import JobCard from "./JobCard";
const MyAccount = () => {
  return (
    <div>
    <div className="bg-white rounded-md border-2 border-gray-300 p-3">
      <div className="font-bold flex items-center gap-3">
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
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        My account
      </div>
      <div>
        <div className="flex flex-col items-center gap-y-2 mt-5">
          <img src={avatar} className="size-30" alt="" />

          <div className="text-xl font-bold">Mohd Belal Naim</div>
          <div>Full stack engineer</div>
          <div className="flex text-sm gap-2 flex-wrap justify-center mt-2">
            {["C++", "HTML", "CSS", "Javascript", "C++", "HTML", "CSS"].map(
              (skill, index) => (
                <div className=" bg-gray-100 border border-gray-300 px-2 py-0.5 rounded-md">
                  {skill}
                </div>
              )
            )}
          </div>
          <div className="lg:w-[50%] text-sm text-center mt-2 sm:w-full sm:text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            repellat eligendi aut, tempora vitae quos eos, laborum dolores
            maxime molestiae culpa eius cum qui distinctio maiores labore ab
            atque nihil.
          </div>
          <div className="flex gap-2 mt-2">
            <button className="flex items-center gap-2 text-sm bg-blue-500 text-white rounded p-2">
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Edit profile
            </button>
            <button className="flex items-center gap-2 text-sm bg-blue-500 text-white rounded p-2">
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
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
              Share profile
            </button>
          </div>
        </div>
      </div>
    </div>
      <div className="font-bold py-2">Jobs you have applied to</div>
      <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
      </div>
    </div>
  );
};

export default MyAccount;
