import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Header from "./Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col l">
      <Header />

      {/*Page body*/}

      <div className="flex-1 container mx-auto grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-6 mt-2 px-1">
        <aside className="hidden sm:block">
          <Sidebar />
        </aside>

        <main>
          <div className="flex w-[95%] mx-auto bg-gray-100 mb-2  rounded shadow p-1 lg:hidden">
            <div className="p-2 text-xs w-[50%] text-center rounded cursor-pointer bg-white">
              Jobs
            </div>

            <Link
              to="/campus"
              className="p-2 text-xs w-[50%] text-center rounded cursor-pointer"
            >
              Campus program
            </Link>
          </div>
          <Main />
        </main>
      </div>
    </div>
  );
};

export default Home;