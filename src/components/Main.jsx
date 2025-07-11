import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import CircularProgress from "./Progress";
import { FaWhatsapp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showComponent } from "../redux/authSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Skeleton Component
const JobCardSkeleton = () => (
  <div className="bg-white p-4 border rounded-md border-gray-300 animate-pulse space-y-4">
    <div className="flex gap-4 items-center">
      <div className="size-[50px] bg-gray-300 rounded-md"></div>
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="flex gap-2 mt-3">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
    <div className="h-4 bg-gray-200 rounded w-1/3 mt-3"></div>
    <div className="h-4 bg-gray-100 rounded w-full mt-4"></div>
    <div className="flex justify-between items-center mt-4">
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      <div className="h-8 bg-gray-300 rounded w-24"></div>
    </div>
  </div>
);

const Main = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const today = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const handleWhatsapp = () => {
    if (!user) {
      dispatch(showComponent());
      return;
    }
    alert("WhatsApp group link is not available yet.");
  };

  // Fetch jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-sm:px-1">
      {/* Desktop Profile Box */}
      {isLoggedIn && (
        <div className="max-lg:hidden bg-white rounded-lg border border-gray-300 px-5 py-6 flex items-center justify-between">
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
              <div className="cursor-pointer flex items-center gap-2 px-2 rounded-full py-1 text-sm text-gray-600 border border-gray-300 hover:bg-blue-100 hover:text-blue-500">
                Update your profile
              </div>
              <div className="cursor-pointer flex items-center gap-2 px-2 rounded-full py-1 text-sm text-gray-600 border border-gray-300 hover:bg-blue-100 hover:text-blue-500">
                Create resume
              </div>
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
        <div className="lg:hidden bg-white rounded-lg border border-gray-300 px-5 py-4 grid gap-y-2 mb-1">
          <div className="text-xs flex items-center gap-2">{formattedDate}</div>
          <div>Hi, {user?.name}</div>
          <div className="w-full h-1 bg-gray-200 rounded-full">
            <div className="w-[76%] h-1 bg-blue-500 rounded-full"></div>
          </div>
          <div className="text-xs text-blue-500">76% complete</div>
        </div>
      )}

      {/* WhatsApp Banner */}
      <div className="mb-1 bg-white gap-4 flex items-center justify-between rounded-md border border-gray-300 p-5 mt-2 max-sm:flex-col max-sm:py-2">
        <div className="flex items-center gap-2 max-sm:gap-3">
          <FaWhatsapp className="size-20 max-sm:size-24" color="#25D366" />
          <div>
            <div className="text-lg font-bold max-sm:text-sm">
              Join our WhatsApp group
            </div>
            <div className="text-sm w-[60%] max-sm:text-xs max-sm:w-full">
              Join our WhatsApp group to get access to the latest jobs delivered
              directly to your inbox everyday
            </div>
          </div>
        </div>
        <button
          onClick={handleWhatsapp}
          className="bg-green-200 max-sm:text-xs max-sm:mb-3 max-sm:w-full px-5 py-1.5 rounded-full text-sm text-green-600 border border-green-600 font-bold cursor-pointer hover:bg-green-600 hover:text-white"
        >
          Join
        </button>
      </div>

      {/* Job Header */}
      <div
        className={`flex justify-between items-center py-4 z-[999] top-0 max-sm:hidden`}
      >
        <div className="text-sm">
          <span className=" font-bold">{jobs.length}</span> Jobs found
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div>Sort By</div>
          <select className="bg-white text-sm border border-gray-300 px-2 py-1 rounded">
            <option>Newest Post</option>
          </select>
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid lg:grid-cols-2 gap-2 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
          : jobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
};

export default Main;
