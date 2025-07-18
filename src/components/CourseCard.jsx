import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { showComponent } from "../redux/authSlice";
import { CiAlarmOn } from "react-icons/ci";
import toast from 'react-hot-toast';
const CourseCard = ({ job }) => {
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
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-[32px] transition hover:shadow-lg duration-300">
      <div className="">
        <h2 className="text-2xl  font-semibold text-blue-800">
          Course Title
        </h2>

      </div>
      <div className='flex flex-row items-center gap-1 mt-1'>
        <CiAlarmOn />
        <p className="text-sm text-gray-500">To be started</p>
      </div>


      <div className="flex text-sm gap-1 mt-2">
        <span className="bg-yellow-100 text-yellow-800 font-medium rounded-full px-3 py-1">
          Seats Left
        </span>
      </div>

      <div className="description">
        <p className="text-sm text-gray-400 font-medium mt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam minima, illo recusandae ipsam cupiditate porro dicta.
        </p>
        <p className="text-sm text-gray-400 font-medium mt-2">
          Impedit voluptate incidunt aspernatur autem repudiandae soluta sunt doloremque in nostrum omnis, veritatis debitis!
        </p>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">React</span>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Node.js</span>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">MongoDB</span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">Tailwind CSS</span>
        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-medium">REST API</span>
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">Git</span>
        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium">Firebase</span>
      </div>



      <button onClick={handleregister} className=" w-full mt-4 px-4 bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 transition">
        Register Now
      </button>


    </div>
  );
};

export default CourseCard;
