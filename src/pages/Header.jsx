import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Auth from "../components/Auth";
import { showComponent } from "../redux/authSlice";

const Header = () => {
  const [sidebar, setSideBar] = useState(false);
  const isVisible = useSelector((state) => state.auth.isComponentVisible);
  const dispatch = useDispatch();
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

          <Link to={"/"}>
            <div className="animate__animated animate__fadeInUp">Home</div>
          </Link>
          <Link to={"/campus"}>
            <div className="animate__animated animate__fadeInUp">My campus</div>
          </Link>
          <Link to={"/saved"}>
            <div className="animate__animated animate__fadeInUp">Saved</div>
          </Link>
          <Link to={"/visited"}>
            <div className="animate__animated animate__fadeInUp">Visted</div>
          </Link>
          <div
            onClick={() => dispatch(showComponent())}
            className="animate__animated animate__fadeInUp"
          >
            My Account
          </div>
        </div>
      )}
      <div className="bg-white flex items-center justify-between p-2 mb-2 max-sm:flex-col max-sm:items-start">
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
          <section className="border border-gray-300 flex items-center oveflow-hidden rounded-md w-[90%] max-sm:w-[100%]">
            <input
              type="text"
              placeholder="Search for jobs here"
              className="w-[95%] max-sm:w-[85%] outline-hidden text-sm px-2 max-sm:text-xs"
            />
            <button className="bg-blue-100 w-[10%] max-sm:w-[15%] max flex justify-center text-blue-500 py-2 cursor-pointer">
              <Link to={"/search"}><svg
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
              </Link>
            </button>
          </section>
          <section className="max-sm:hidden">           
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8 cursor-pointer"
              onClick={() => dispatch(showComponent())}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </section>
        </div>
      </div>
    </>
  );
};

export default Header;
