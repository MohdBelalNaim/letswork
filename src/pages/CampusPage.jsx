import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import student from "../assets/students.svg";
import Header from "./Header";

const CampusPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-6 mt-2 max-sm:px-1">
        <aside className="hidden sm:block">
          <Sidebar />
        </aside>
        <main>
          <div className="bg-white p-4 rounded border-gray-300 border max-sm:p-2">
            <div className="font-bold text-xl py-2 text-center max-sm:text-sm">
              Welcome to My campus by LetsWork
            </div>
            <div className="text-sm w-[60%] mx-auto text-center max-sm:w-[100%] max-sm:text-xs">
              At Lets Work, we believe that college campuses are vibrant ecosystems of talent, ambition, and innovation. Our platform bridges the gap between students and industry by bringing exclusive job opportunities, internships, and career-building resources directly to your campus. Whether you're a final-year student preparing for placements or a freshman exploring career paths, we empower you with tools to grow, connect, and succeed. Join us in shaping a future where every student finds their ideal career path right from the classroom.
            </div>
            <div className="flex justify-center">
              <img src={student} alt="" className="size-100 max-sm:size-60" />
            </div>
            <div className="text-center py-2 flex flex-col justify-center items-center gap-2 w-[40%] mx-auto max-sm:w-[100%]">
              <select
                name=""
                id=""
                className="border border-gray-300 rounded p-2 w-full text-sm  max-sm:text-xs"
              >
                <option value="">Choose your college</option>
                <option value="">Integral University Lucknow</option>
              </select>
              <input
                type="text"
                placeholder="Enter your college email address"
                className="w-full border border-gray-300 rounded p-2 text-sm max-sm:text-xs"
              />
              <button className="text-sm bg-blue-500 text-white rounded p-2 w-full flex justify-center items-center gap-2 hover:bg-blue-600 transition-colors">
                Join now{" "}
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
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </button>
            </div>
            <div className="text-xs mx-auto w-[40%] text-center text-gray-500 mt-4 max-sm:w-[100%]">
              By continuing you agree to terms and conditions, and terms of use
              for being a member of My campus service provided by Letswork
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CampusPage;
