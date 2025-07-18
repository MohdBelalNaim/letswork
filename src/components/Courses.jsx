import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import CircularProgress from "./Progress";
import LinearProgressBar from "./LinearProgressBar";
import { FaWhatsapp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showComponent } from "../redux/authSlice";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { query } from "firebase/firestore";
import JobCardSkeleton from "./JobCardSkeleton";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
// Skeleton Component

const Courses = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("posted");
  const today = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const handleWhatsapp = () => {
    if (!user) {
      dispatch(showComponent());
      return;
    }
    alert("WhatsApp group link is not available yet.");
  }

  return (
    <div className="max-sm:px-1">
      {/* WhatsApp Banner */}
      <div className="mb-1 bg-white gap-4 flex items-center justify-between rounded-md border border-gray-300 p-5 mt-0.5 max-sm:flex-col max-sm:py-2">
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


      {/* Job Grid */}
      <div className="mt-2 grid lg:grid-cols-3 gap-2 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
        <CourseCard/>
        <CourseCard/>
        <CourseCard/>
        <CourseCard/>
        <CourseCard/>

      </div>
    </div>
  );
};

export default Courses;
