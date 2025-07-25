import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import student from "../assets/students.svg";
import Header from "./Header";
import Campus from "../components/Campus";
import CampusJobs from "../components/CampusJobs";
const CampusPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-6 mt-2 max-sm:px-1">
        <aside className="hidden sm:block">
          <Sidebar />
        </aside>
        <main>
          <CampusJobs />
        </main>
      </div>
    </div>
  );
};

export default CampusPage;
