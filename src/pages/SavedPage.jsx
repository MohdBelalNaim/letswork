import React from "react";

import "react-circular-progressbar/dist/styles.css";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Saved from "../components/Saved";

const SavedPage = () => {
  return (
    <div className="bg-blue-50">
      <div className="bg-white flex justify-between items-center p-4">
        <div className="text-xl text-blue-500">letswork</div>
        <div className="flex items-center border border-gray-300 w-[60%] rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search for jobs here"
            className="px-3 w-[95%] text-sm"
          />
          <button className="flex justify-center bg-blue-100 w-[5%] py-2 text-blue-500">
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-[25%_75%] gap-6">
          <div className="py-6">
            <Sidebar />
          </div>
          <div className="py-6">
            <Saved />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedPage;
