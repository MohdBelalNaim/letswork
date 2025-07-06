import React, { useState } from "react";
import GoogleLogin from "./GoogleLogin";
import signin from "../assets/signin.svg";
const Login = () => {
  const [next, setNext] = useState(false);
  return (
    <div>
      <div className="font-medium">Sign in to your LetsWork account!</div>
      <div className="text-xs mt-1">
        Sign in to your LetsWork account to apply for jobs, manage your profile,
        and get personalized job recommendations.
      </div>
      <div className="flex justify-center">
        <img src={signin} alt="" className="size-85" />
      </div>
      <div className="grid gap-y-3">
        <input
          type="text"
          placeholder="Enter your email address"
          className="text-sm border rounded border-gray-300 p-2 w-full"
        />
        {next && (
          <input
            type="text"
            placeholder="Enter your password"
            className="text-sm border rounded border-gray-300 p-2 w-full"
          />
        )}
        <button
          onClick={() => setNext(true)}
          className="cursor-pointer text-sm text-white bg-blue-500 rounded  p-2 w-full"
        >
          {next ? "Login" : "Next"}
        </button>
        <div className="text-center">or</div>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
