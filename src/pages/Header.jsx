import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../components/Auth";
import { showComponent } from "../redux/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { clearUser } from "../redux/userSlice";
import { logout as logoutAuth } from "../redux/authSlice";
import { persistor } from "../redux/store";

const Header = () => {
  const [sidebar, setSideBar] = useState(false);
  const [query, setQuery] = useState("");
  const isVisible = useSelector((state) => state.auth.isComponentVisible);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const nav = useNavigate();
  function handleNavigation(path) {
    if (path == "/saved" || path == "/visited" || path == "/account") {
      if (!user) {
        dispatch(showComponent());
        setSideBar(false);
        return;
      }
    }
    nav(path);
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      dispatch(logoutAuth());
      await persistor.purge();
      nav("/");
      setSideBar(false);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Try again.");
    }
  };
  const handleSearch = async () => {
    if (query != "") {
      nav(`/search/${query}`);
    }
  };
  return (
    <>
      {isVisible && <Auth />}
      {sidebar && (
        <div className="fixed inset-0 bg-white flex flex-col place-items-center justify-center gap-y-4 z-50">
          <svg
            onClick={() => setSideBar(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 absolute top-4 right-4 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>

          <div
            onClick={() => handleNavigation("/")}
            className="animate__animated animate__fadeInUp"
          >
            Home
          </div>

          <div
            onClick={() => handleNavigation("/campus")}
            className="animate__animated animate__fadeInUp"
          >
            My campus
          </div>

          <div
            className="animate__animated animate__fadeInUp"
            onClick={() => handleNavigation("/account")}
          >
            My Account
          </div>
          {user && (
            <>
              <div
                onClick={() => handleNavigation("/saved")}
                className="animate__animated animate__fadeInUp"
              >
                Saved
              </div>

              <div
                onClick={() => handleNavigation("/visited")}
                className="animate__animated animate__fadeInUp"
              >
                Visted
              </div>

              <div
                onClick={() => handleLogout()}
                className="animate__animated animate__fadeInUp"
              >
                Sign out
              </div>
            </>
          )}
        </div>
      )}
      <div className="bg-white flex items-center justify-between p-2 max-sm:flex-col max-sm:items-start">
        <div className="text-blue-500 flex items-center justify-between w-full py-2">
          LetsWork
          <section>
            <svg
              onClick={() => setSideBar(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 hidden max-sm:block"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </section>
        </div>
        <div className="w-[60%] max-sm:w-[100%] flex items-center justify-center gap-2">
          <section className="border border-gray-300 flex items-center oveflow-hidden rounded-md w-[100%]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for jobs here"
              className="w-[95%] max-sm:w-[85%] outline-hidden text-sm px-2 max-sm:text-xs"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-100 w-[10%] max-sm:w-[15%] max flex justify-center text-blue-500 py-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Header;
