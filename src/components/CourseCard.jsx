import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { showComponent } from "../redux/authSlice";
import { CiAlarmOn } from "react-icons/ci";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const CourseCard = ({ courses }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const handleregister = async () => {
    if (!user) {
      dispatch(showComponent());
      return;
    }
    else {
      toast.success("Registered")
    }
  };
  const skillColors = {
  React: "bg-blue-100 text-blue-800",
  "Node.js": "bg-green-100 text-green-800",
  MongoDB: "bg-yellow-100 text-yellow-800",
  "Tailwind CSS": "bg-purple-100 text-purple-800",
  "REST API": "bg-pink-100 text-pink-800",
  Git: "bg-red-100 text-red-800",
  Firebase: "bg-gray-100 text-gray-800",
};
  return (
    
    <div className="bg-white border rounded-lg border-gray-300 max-sm:mb-3 p-[32px] transition duration-300">
      <div className="">
        <h2 className="text-2xl  font-semibold text-blue-800">
          {courses.courseName}
        </h2>

      </div>
      <div className='flex flex-col gap-1 mt-1'>
        <p className="text-sm text-gray-500">By {courses.instructor}</p>
        <p className="text-sm text-gray-500">To be Started on {courses.startDate}</p>
        {/* <p className="text-sm text-gray-500">Ending on {courses.endDate}</p> */}
        <p className="text-sm text-gray-500">Total Duration {courses.duration}</p>

      </div>


      <div className="flex text-sm gap-1 mt-2">
        <span className="bg-yellow-100 text-yellow-800 font-medium rounded-full px-3 py-1">
          {courses.seatsLeft} Seats Left
        </span>
      </div>
      <Link to={`/courses/${courses?.id || "123"}`}>
      <button  className=" w-full mt-4 px-4 bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 transition">
        Learn More
      </button>
      </Link>

      

    </div>
    
  );
};

export default CourseCard;
