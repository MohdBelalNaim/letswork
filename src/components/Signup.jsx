import React, { useState } from "react";
import GoogleLogin from "./GoogleLogin";
import teamimage from "../assets/members.svg";

const Signup = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="font-medium">Become a LetsWork member!</div>
      <div className="text-xs mt-1">
        Only people with a LetsWorrk profile can apply to jobs listed on our
        platform, members also get access to daily job updates and new job
        postings via email so that they never miss out on an opportunity
      </div>
      <div className="flex justify-center">
        <img src={teamimage} alt="" className="size-85" />
      </div>
      <div className="grid gap-y-3">
        {show ? (
          <>
            <input
              type="text"
              placeholder="Enter your full name"
              className="text-sm border rounded border-gray-300 p-2 w-full"
            />
            <input
              type="text"
              placeholder="Enter your phone number"
              className="text-sm border rounded border-gray-300 p-2 w-full"
            />
            <input
              type="text"
              placeholder="Create a new password"
              className="text-sm border rounded border-gray-300 p-2 w-full"
            />
          </>
        ) : (
          <input
            type="text"
            placeholder="Enter your email address"
            className="text-sm border rounded border-gray-300 p-2 w-full"
            readOnly={show ? true : false}
          />
        )}
        {show ? (
          <div className="flex gap-2">
            <button
              onClick={() => setShow(false)}
              className="cursor-pointer w-[10%] text-center p-2 text-sm bg-gray-200 rounded flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <button className="cursor-pointer w-[90%] text-center p-2 text-sm bg-blue-500 rounded text-white">
              Finish
            </button>
          </div>
        ) : (
          <button
            className="text-sm text-white bg-blue-500 rounded  p-2 w-full cursor-pointer"
            onClick={() => setShow(true)}
          >
            Next
          </button>
        )}
        <div className="text-center">or</div>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Signup;
