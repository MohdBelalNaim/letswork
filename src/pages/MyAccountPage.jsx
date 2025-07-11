import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Header from "./Header";
import MyAccount from "../components/MyAccount";
import AuthGuard from "../components/AuthGuard";
function MyAccountPage() {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container px-1 mx-auto grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-6 mt-2  ">
        <aside className="hidden sm:block">
          <Sidebar />
        </aside>

        <main>
          <AuthGuard>
            <MyAccount />
          </AuthGuard>
        </main>
      </div>
    </div>
  );
}

export default MyAccountPage;
