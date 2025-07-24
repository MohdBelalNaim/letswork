import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { showComponent } from "../redux/authSlice";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CiAlarmOn } from "react-icons/ci";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { MdEventSeat } from "react-icons/md";
import { TbCurrencyRupee } from "react-icons/tb";
import forget from "../assets/Forgot password-rafiki.png"

const CourseCard = ({ courses }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleregister = async () => {
    if (!user) {
      dispatch(showComponent());
      return;
    } else {
      toast.success("Registered");
    }
  };

  return (
    <div className='overflow-hidden mb-2 border border-gray-300 rounded-lg'>
      {/* Top Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={courses.image || forget}
          alt={courses.courseName}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="bg-white">

      

      <div className="p-6 max-sm:p-4 ">
        <h2 className="text-xl font-semibold text-blue-800 mb-1">{courses.courseName}</h2>

        

        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p className="flex items-center gap-2">
            <CiAlarmOn className="text-lg" />
            Starts on: <span className="font-medium">{courses.startDate}</span>
          </p>
          <p className="flex items-center gap-2">
            <CiAlarmOn className="text-lg" />
            Duration: <span className="font-medium">{courses.duration}</span>
          </p>
        </div>

        <div className="flex justify-between items-center text-sm mb-4">
          <div className="flex items-center text-gray-600 text-sm gap-2 mb-2">
          <PiChalkboardTeacherLight className="text-lg" />
          <p>By <span className="font-medium text-gray-700">{courses.instructor}</span></p>
        </div>
          <div className="flex items-center gap-1 text-blue-700 font-semibold">
            <TbCurrencyRupee className="text-xl" />
            {courses.price}
          </div>
        </div>

        <Link to={`/courses/${courses?.id || "123"}`}>
          <button className="w-full mt-2 px-4 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition">
            Learn More
          </button>
        </Link>
      </div>
    </div>
    </div>
    
  );
};

export default CourseCard;
