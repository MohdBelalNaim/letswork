import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideComponent } from "../redux/authSlice";

import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
const Auth = () => {
  const [page, setPage] = useState("login");

  const pages = {
    signup: <Signup switchPage={setPage} />,
    login: <Login switchPage={setPage} />,
    forgot: <ForgotPassword switchPage={setPage} />
  };
  const dispatch = useDispatch();
  return (
    <div
      className="inset-0 bg-black/30 backdrop-blur-md fixed
 z-[9999999] grid place-items-center overflow-scroll max-sm:py-4"
    >
      <div className="bg-white w-[480px] max-sm:w-[96%] p-4 rounded relative">
        <div className="absolute bg-blue-500 text-white cursor-pointer p-1 rounded-full -right-2 -top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
            onClick={() => dispatch(hideComponent())}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg mb-2">
           <div
            className={`w-[50%] text-center text-sm py-1 rounded cursor-pointer ${
              page === "signup" ? "bg-white" : "bg-gray-100"
            }`}
            onClick={() => setPage("signup")}
          >
            Signup
          </div>
          <div
            className={`w-[50%] text-center text-sm py-1 rounded cursor-pointer ${
              page === "login" ? "bg-white" : "bg-gray-100"
            }`}
            onClick={() => setPage("login")}
          >
            Login
          </div>
        </div>
         {pages[page]}
      </div>
    </div>
  );
};

export default Auth;
