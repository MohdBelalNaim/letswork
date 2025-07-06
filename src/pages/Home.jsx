import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Header from "./Header";
import Auth from "../components/Auth";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Jobs"); // Default active tab

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col l">
      <Header />

      {/*Page body*/}

      <div className="flex-1 container mx-auto grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-6 mt-2 px-1">
        

        {/* Desktop sidebar */}
        <aside className="hidden sm:block">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main>
          <div className="flex w-[95%] mx-auto bg-gray-100 mb-4 rounded shadow p-1 lg:hidden">
            {/* Jobs Tab */}
            <div
              className={`p-2 text-xs w-[50%] text-center rounded cursor-pointer ${
                activeTab === "Jobs" ? "bg-white" : "bg-gray-100"
              }`}
              onClick={() => setActiveTab("Jobs")}
            >
              Jobs
            </div>

            {/* Campus Program Tab */}
            <div
              className={`p-2 text-xs w-[50%] text-center rounded cursor-pointer ${
                activeTab === "Campus program" ? "bg-white" : "bg-gray-100"
              }`}
              onClick={() => setActiveTab("Campus program")}
            >
              Campus program
            </div>
          </div>
          <Main />
        </main>
      </div>
    </div>
  );
};

export default Home;
