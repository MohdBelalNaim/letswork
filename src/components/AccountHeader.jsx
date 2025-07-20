
import React, { useEffect, useState } from "react";
import CircularProgress from "./Progress";
import LinearProgressBar from "./LinearProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const AccountHeader = () => {
      const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
      const user = useSelector((state) => state.user.currentUser);
      const today = new Date();
      const options = { weekday: "long", month: "long", day: "numeric" };
      const formattedDate = today.toLocaleDateString("en-US", options);
  return (
    <div>
      {isLoggedIn && (
        <div className="max-lg:hidden bg-white rounded-lg border border-gray-300 p-6 flex items-center justify-between">
          <div>
            <div className="text-sm flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0Z"
                />
              </svg>
              {formattedDate}
            </div>
            <div className="text-xl mt-3">Hi, {user?.name}!</div>
            <div className="text-sm mt-3">Let's get done with the basics</div>
            <div className="flex gap-2 mt-2">
              <Link to="/account">
                <div className="cursor-pointer flex items-center gap-2 px-2 rounded-full py-1 text-sm text-gray-600 border border-gray-300 hover:bg-blue-100 hover:text-blue-500">
                  Update your profile
                </div>
              </Link>
              <a href="https://www.overleaf.com/" target="_blank">
                <div className="cursor-pointer flex items-center gap-2 px-2 rounded-full py-1 text-sm text-gray-600 border border-gray-300 hover:bg-blue-100 hover:text-blue-500">
                  Create resume
                </div>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm mb-2">Profile completion</div>
            <div className="size-20">
              <CircularProgress percent={76} size={96} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Profile Box */}
      {isLoggedIn && (
        <div className="lg:hidden bg-white rounded-lg border border-gray-300 p-[16px] grid gap-y-2 mb-1">
          <div className="text-xs flex items-center gap-2">{formattedDate}</div>
          <div>Hi, {user?.name}</div>
          <LinearProgressBar />
        </div>
      )}
    </div>
  )
}

export default AccountHeader
