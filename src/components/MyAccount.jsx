import React, { useState, useEffect } from "react";
import avatar from "../assets/avatar.png";
import JobCard from "./JobCard";
import Edit from "./Edit";
import { useSelector } from "react-redux";
import GoBack from "./GoBack";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

// Skeleton Card Component
const SkeletonJobCard = () => (
  <div className="bg-white p-4 border rounded-md border-gray-300 animate-pulse space-y-3">
    <div className="flex gap-4 items-center">
      <div className="w-12 h-12 bg-gray-300 rounded-md" />
      <div className="flex flex-col gap-2 w-full">
        <div className="h-3 bg-gray-300 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
    <div className="flex gap-2 mt-3">
      <div className="w-16 h-4 bg-gray-200 rounded" />
      <div className="w-14 h-4 bg-gray-200 rounded" />
    </div>
    <div className="h-3 bg-gray-200 rounded w-1/4 mt-2" />
    <div className="flex justify-between items-center mt-4">
      <div className="h-3 bg-gray-300 rounded w-20" />
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-gray-200 rounded" />
        <div className="h-6 w-6 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

const MyAccount = () => {
  const [edit, setEdit] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applied jobs
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!user?.email) return;

      try {
        const q = query(
          collection(db, "jobsManage"),
          where("user.email", "==", user.email),
          where("type", "==", "Applied")
        );

        const querySnapshot = await getDocs(q);
        const jobs = [];

        querySnapshot.forEach((doc) => {
          const jobData = doc.data().job;
          if (jobData) {
            jobs.push({ id: jobData.id || doc.id, ...jobData });
          }
        });

        setAppliedJobs(jobs);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [user]);

  return (
    <div>
      {edit && <Edit controller={setEdit} />}

      <div className="bg-white rounded-md border-1 border-gray-300 p-3">
        <div className="font-bold flex items-center gap-3">
          <GoBack />
          My account
        </div>

        <div className="flex flex-col items-center gap-y-2 mt-5">
          <img src={avatar} className="size-30" alt="Avatar" />
          <div className="text-xl font-bold maxpsm:text-lg">
            {user?.name || "Undefined"}
          </div>

          {user?.designation && <div>{user?.designation}</div>}

          {user?.skills && (
            <div className="flex text-sm gap-2 flex-wrap justify-center mt-2">
              {user.skills.split(",").map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded-md max-sm:text-xs"
                >
                  {skill}
                </div>
              ))}
            </div>
          )}

          {user?.bio && (
            <div className="w-[80%] text-sm text-center mt-2 max-sm:w-full max-sm:text-xs">
              {user.bio}
            </div>
          )}

          <div className="flex gap-2 mt-2 mb-2">
            <button
              onClick={() => setEdit(true)}
              className="max-sm:text-xs cursor-pointer flex items-center gap-2 text-sm bg-blue-100 text-blue-500 border border-blue-500 rounded p-2 hover:bg-blue-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Edit profile
            </button>

          </div>
        </div>
      </div>

      <div className="font-bold py-2">Jobs you have applied to</div>

      <div className="grid lg:grid-cols-2 gap-2 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonJobCard key={i} />)
        ) : appliedJobs.length > 0 ? (
          appliedJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-sm text-gray-500 col-span-full p-4 text-center">
            You haven’t applied to any jobs yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
