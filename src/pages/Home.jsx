import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Header from "./Header";
import Auth from "../components/Auth";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />

      {/*Page body*/}

      <div className="flex-1 container mx-auto grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-6 mt-2 px-1">
        

        {/* Desktop sidebar */}
        <aside className="hidden sm:block">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main>
          <Main />
        </main>
      </div>
      {/* <footer className="mt-4">
          <Footer/>
        </footer> */}
    </div>
  );
};

export default Home;
