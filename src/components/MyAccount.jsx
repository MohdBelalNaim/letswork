import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import JobCard from "./JobCard";
import Edit from "./Edit";
import { useSelector } from "react-redux";
import GoBack from "./GoBack";
const MyAccount = () => {
  const [edit, setEdit] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div>
      {edit && <Edit controller={setEdit} />}
      <div className="bg-white rounded-md border-1 border-gray-300 p-3">
        <div className="font-bold flex items-center gap-3">
          <GoBack />
          My account
        </div>
        <div>
          <div className="flex flex-col items-center gap-y-2 mt-5">
            <img src={avatar} className="size-30" alt="" />

            <div className="text-xl font-bold maxpsm:text-lg">
              {user?.name || "Undefined"}
            </div>
            {user?.designation && <div>{user?.designation}</div>}
            {user?.skills && (
              <div className="flex text-sm gap-2 flex-wrap justify-center mt-2">
                {user?.skills?.split(",").map((skill, index) => (
                  <div className=" bg-gray-100 border border-gray-300 px-2 py-0.5 rounded-md max-sm:text-xs">
                    {skill}
                  </div>
                ))}
              </div>
            )}
            {user?.bio && (
              <div className="w-[50%] text-sm text-center mt-2 max-sm:w-[100%] max-sm:text-xs">
                {user?.bio}
              </div>
            )}
            <div className="flex gap-2 mt-2 mb-2">
              <button
                onClick={() => setEdit(true)}
                className="max-sm:text-xs cursor-pointer flex items-center gap-2 text-sm bg-blue-100 text-blue-500 border border-blue-500 rounded p-2  hover:bg-blue-500 hover:text-white"
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
                Edit profile
              </button>
              <button className="max-sm:text-xs flex items-center gap-2 text-sm bg-blue-100 text-blue-500 border border-blue-500  rounded p-2 cursor-pointer hover:bg-blue-500 hover:text-white">
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
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
                Share profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="font-bold py-3">Jobs you have applied to</div>
      <div className="grid lg:grid-cols-2 gap-2  md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </div>
  );
};

export default MyAccount;
