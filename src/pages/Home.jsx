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

      <div className="flex-1 container mx-auto grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-4 mt-2 px-1">
        <aside className="hidden sm:block">
          <Sidebar />
        </aside>

        <main>
          <Main />
        </main>
      </div>
    </div>
  );
};

export default Home;