import React from 'react'
import Sidebar from "../components/Sidebar";
import Header from "./Header";
import Visited from "../components/Visited";
import Search from "../components/Search";
const Searched = () => {
  return (
    <div>
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container px-1 mx-auto grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-6 mt-2">
        <aside className="hidden sm:block ">
          <Sidebar />
        </aside>
        <main>
          <Search/>
        </main>
      </div>
    </div>
    </div>
  )
}

export default Searched
