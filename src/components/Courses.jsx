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
import CourseCard from "../components/CourseCard"
import WhatsAppBanner from "./WhatsAppBanner";
// Skeleton Component

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);
  {
    console.log(courses)
  }
  const today = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const handleWhatsapp = () => {
    if (!user) {
      dispatch(showComponent());
      return;
    }
    const whatsappGroupLink = "https://chat.whatsapp.com/JhXYXasBWB2FJailZ6JFqH?mode=r_c "; // Replace with your actual WhatsApp group link
    window.open(whatsappGroupLink, "_blank");
    
  };
  return (
    <div className="max-sm:px-1">
      {/* WhatsApp Banner */}

      <div className="mb-4 bg-white gap-4 flex items-center justify-between rounded-md border border-gray-300 p-6 mt-[5.5px] max-sm:flex-col max-sm:py-2">
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

      {/* Courses Grid */}
      <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
          : courses.map((courses) => <CourseCard key={courses.id} courses={courses} />)}
      </div>
    </div>
  );
};

export default Courses;
