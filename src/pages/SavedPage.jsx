import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Saved from "../components/Saved";
import Header from "./Header";
import AuthGuard from "../components/AuthGuard";

const DetailsPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container px-1 mx-auto grid grid-cols-1   sm:grid-cols-[18rem_1fr] gap-2 mt-2">
        <aside className="hidden sm:block ">
          <Sidebar />
        </aside>
        <main>
          <AuthGuard>
            <Saved />
          </AuthGuard>
        </main>
      </div>
    </div>
  );
};

export default DetailsPage;
