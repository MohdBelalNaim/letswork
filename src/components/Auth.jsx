import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideComponent } from "../redux/authSlice";
import GoogleLogin from "./GoogleLogin";

const Auth = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  return (
    <div
      className="inset-0 bg-black/30 backdrop-blur-md absolute
 z-[9999999] grid place-items-center"
    >
      {!toggle ? (
        <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] max-sm:w-[96%] animate__animated animate__bounceIn">
          <div className="font-bold flex items-center justify-between">
            Login to your account{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4 cursor-pointer"
              onClick={() => dispatch(hideComponent())}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="grid gap-y-3 mt-3">
            <input
              className="w-full border border-gray-300 rounded text-sm p-2"
              type="mail"
              placeholder="Email address"
            />
            <input
              className="w-full border border-gray-300 rounded text-sm p-2"
              type="password"
              placeholder="Password"
            />
            <button className="bg-blue-500 text-white w-full p-2 text-sm rounded">
              Login
            </button>
            <GoogleLogin />
            <div
              className="text-xs underline text-center cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              I don't have an account
            </div>
            <div className="text-xs underline text-center">
              I lost my password
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] max-sm:w-[96%]   animate__animated animate__bounceIn">
          <div className="font-bold flex items-center justify-between">
            Create your account
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4 cursor-pointer"
              onClick={() => dispatch(hideComponent())}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="grid gap-y-3 mt-3">
            <input
              className="w-full border border-gray-300 rounded text-sm p-2"
              type="text"
              placeholder="Full name"
            />
            <input
              className="w-full border border-gray-300 rounded text-sm p-2"
              type="mail"
              placeholder="Email address"
            />
            <input
              className="w-full border border-gray-300 rounded text-sm p-2"
              type="password"
              placeholder="Password"
            />
            <button className="bg-blue-500 text-white w-full p-2 text-sm rounded">
              Signup
            </button>
            <GoogleLogin />
            <div
              className="text-xs underline text-center cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              I already have an account
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
