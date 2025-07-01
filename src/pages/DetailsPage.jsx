import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Details from "../components/Details";
import Header from "./Header";

const DetailsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
     <Header/>

      {/* Page Content */}
      <main className="flex-1 container mx-auto grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 py-6 px-4 sm:px-6 lg:px-8">
        <aside className="hidden md:block">
          <Sidebar />
        </aside>
        <section>
          <Details />
        </section>
      </main>
    </div>
  );
};

export default DetailsPage;
