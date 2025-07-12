import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import GoBack from "./GoBack";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";

// Skeleton loader while loading job cards
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

const Saved = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!user?.email) return;

      try {
        const q = query(
          collection(db, "jobsManage"),
          where("user.email", "==", user.email),
          where("type", "==", "Saved")
        );

        const querySnapshot = await getDocs(q);
        const jobs = [];

        querySnapshot.forEach((doc) => {
          const jobData = doc.data().job;
          if (jobData) {
            jobs.push({ id: jobData.id || doc.id, ...jobData });
          }
        });

        setSavedJobs(jobs);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [user]);

  return (
    <div>
      <div className="text-lg font-bold py-4 flex items-center gap-x-3">
        <GoBack />
        Saved jobs
      </div>

      <div className="grid lg:grid-cols-2 gap-2 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonJobCard key={i} />)
        ) : savedJobs.length > 0 ? (
          savedJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-sm text-gray-500 col-span-full p-4 text-center">
            No saved jobs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
