import React from "react";
import GoogleLogin from "./GoogleLogin";
import teamimage from "../assets/members.svg";

const Signup = () => {
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
        <input
          type="text"
          placeholder="Enter your email address"
          className="text-sm border rounded border-gray-300 p-2 w-full"
        />
        <button className="text-sm text-white bg-blue-500 rounded  p-2 w-full">
          Continue
        </button>
        <div className="text-center">or</div>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Signup;
