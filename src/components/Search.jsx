import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import JobCard from "./JobCard";
import GoBack from "./GoBack";


const JobCardSkeleton = () => (
  <div className="border border-gray-300 p-4 rounded animate-pulse space-y-3 bg-white shadow">
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    <div className="h-6 bg-gray-300 rounded w-24 mt-2"></div>
  </div>
);

const Search = () => {
  const { query } = useParams();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); // Start loading
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        const allJobs = snapshot.docs.map((doc) => doc.data());

        const lowerQuery = query.toLowerCase();

        const matched = allJobs.filter(
          (job) =>
            (job.title && job.title.toLowerCase().includes(lowerQuery)) ||
            (job.company && job.company.toLowerCase().includes(lowerQuery)) ||
            (job.skills && job.skills.toLowerCase().includes(lowerQuery))
        );

        setFilteredJobs(matched);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchJobs();
  }, [query]);

  return (
    <div>
      <div className="text-lg font-bold py-4 flex items-center gap-x-3">
        <GoBack />
        Search results for '{query}'
      </div>

      {loading ? (
        <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
          {[...Array(6)].map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
          {filteredJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center mt-10">No jobs found.</div>
      )}
    </div>
  );
};

export default Search;
