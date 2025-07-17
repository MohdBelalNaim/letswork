import React, { useEffect, useState } from "react";
import student from "../assets/students.svg";
import JobCard from "./JobCard";
import PeopleCard from "./PeopleCard";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { LuGraduationCap } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { setUser } from "../redux/userSlice";
import { showComponent } from "../redux/authSlice";
const Campus = () => {
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const text = `Integral University, Lucknow, established in 2004, is a NAAC A+ accredited private university offering over 225 programs across engineering, medicine, law, agriculture, and more. Recognized by UGC and various professional councils, it spans a modern 125+ acre campus with smart classrooms, labs, a central library, and a 550-bed hospital. The university emphasizes research, sustainability (1 MW solar power), and innovation. It hosts 15,000+ students, supports strong placements in companies like Infosys and Amazon, and fosters a vibrant campus life with fests and clubs. With 30,000+ alumni, it’s a leading institution in Uttar Pradesh’s academic and professional landscape.`;
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const handleRegister = async ({ college, email }) => {
    if (user == "" || user == null) {
      dispatch(showComponent(true));
      navigate("/");
      return;
    }
    if (!email || college === "none") {
      toast.error("Please fill all the fields");
      return;
    }

    const domain = email.split("@")[1];
    if (!["iul.ac.in", "student.iul.ac.in"].includes(domain)) {
      toast.error("Please enter a valid college email address");
      return;
    }

    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No user found with this email");
        setLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userRef = userDoc.ref;

      await updateDoc(userRef, {
        "college.collegeName": college,
        "college.collegeEmail": email,
      });

      const updatedSnapshot = await getDoc(userRef);
      const updatedData = updatedSnapshot.data();

      toast.success("Campus joined successully!");
      dispatch(setUser(updatedData));
      setShow(true);
    } catch (error) {
      console.error("Error updating user document:", error);
      toast.error("Failed to update user info");
    } finally {
      setLoading(false);
    }
  };

  const preview = text.slice(0, 385);
  const people = [
    {
      name: "Mohd Belal Naim",
      designation: "Full Stack Engineer",
      avatar: "https://via.placeholder.com/50",
      skills: ["React", "Node.js", "JavaScript", "CSS"],
    },
    {
      name: "John Doe",
      designation: "Backend Developer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Python", "Django", "SQL"],
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Figma", "Sketch", "Adobe XD"],
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Figma", "Sketch", "Adobe XD"],
    },
  ];
  useEffect(() => {
    if (user == null || user === "") {
      setShow(false);
      return;
    }
    if (
      user?.college?.collegeName === "Integral University Lucknow" &&
      user?.college?.collegeEmail != ""
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  return (
    <>
      {show ? (
        <div>
          <div className="flex gap-2">
            <div className="bg white rounded border border-gray-300 p-4 bg-white">
              <div className="font-bold text-lg">
                Integral University Lucknow
              </div>
              <div className="flex gap-4">
                <section className="min-lg:hidden w-[80%] text-sm">
                  {showMore ? text : `${preview}...`}
                  <button
                    className="text-blue-600 ml-2 hover:underline"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "See Less" : "See More"}
                  </button>
                </section>
                <section className="max-sm:hidden w-[80%] text-sm">
                  {text}
                </section>
                <section className="max-sm:hidden border border-gray-300 rounded  w-[20%] flex items-center justify-center flex-col">
                  <div>NAAC</div>
                  <div className="text-3xl">A+</div>
                </section>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex items-center gap-2 p-2  rounded text-sm border border-gray-300">
                  <BsPeople className="text-xl" />
                  102 members
                </div>
                <div className="flex items-center gap-2 p-2  rounded text-sm border border-gray-300">
                  <HiOutlineBuildingOffice className="text-xl" />
                  332 Jobs
                </div>
                <div className="flex items-center gap-2 p-2  rounded text-sm border border-gray-300">
                  <LuGraduationCap className="text-xl" />
                  234 Alumini
                </div>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.276084857099!2d80.99633347595768!3d26.958155058135336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bff2addd9b239%3A0xc21a9bbd557936ec!2sIntegral%20University!5e0!3m2!1sen!2sin!4v1752166951810!5m2!1sen!2sin"
              width="600"
              height="250"
              allowfullscreen=""
              className="border-1 border-gray-300 rounded max-sm:hidden"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="font-bold py-3">
            People in Integral Univeristy Lucknow
          </div>
          <div className="grid lg:grid-cols-2 gap-2 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
            <PeopleCard />
            <PeopleCard />
            <PeopleCard />
            <PeopleCard />
            <PeopleCard />
            <PeopleCard />
          </div>
          <div className="flex justify-center">
            <Link to={"/campus/people"}>
              <button className="flex items-center gap-2 bg-blue-100 border border-blue-500 text-blue-500 text-xs p-2  my-4 rounded hover:bg-blue-500 hover:text-white">
                See more people <GoArrowRight />
              </button>
            </Link>
          </div>
          <div className="font-bold py-3">
            Jobs for Integral Univeristy Lucknow students
          </div>
          <div className="grid lg:grid-cols-2 gap-2 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
          <div className="flex justify-center">
            <Link to={"/campus/jobs"}>
              <button className="flex items-center gap-2 bg-blue-100 border border-blue-500 text-blue-500 text-xs p-2 mt-4 rounded hover:bg-blue-500 hover:text-white">
                See more Jobs <GoArrowRight />
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded border-gray-300 border max-sm:p-2">
          <div className="font-bold text-xl py-2 text-center max-sm:text-sm">
            Welcome to My campus by HireScript
          </div>
          <div className="text-sm w-[60%] mx-auto text-center max-sm:w-[100%] max-sm:text-xs">
            At HireScript, we believe that college campuses are vibrant
            ecosystems of talent, ambition, and innovation. Our platform bridges
            the gap between students and industry by bringing exclusive job
            opportunities, internships, and career-building resources directly
            to your campus. Whether you're a final-year student preparing for
            placements or a freshman exploring career paths, we empower you with
            tools to grow, connect, and succeed. Join us in shaping a future
            where every student finds their ideal career
          </div>
          <div className="flex justify-center">
            <img src={student} alt="" className="size-100 max-sm:size-60" />
          </div>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="text-center py-2 flex flex-col justify-center items-center gap-2 w-[40%] mx-auto max-sm:w-[100%]">
              <select
                {...register("college")}
                id=""
                className="border border-gray-300 rounded p-2 w-full text-sm  max-sm:text-xs"
              >
                <option value="none">Choose your college</option>
                <option value="Integral University Lucknow">
                  Integral University Lucknow
                </option>
              </select>
              <input
                type="text"
                {...register("email")}
                placeholder="Enter your college email address"
                className="w-full border border-gray-300 rounded p-2 text-sm max-sm:text-xs"
              />
              <button
                type="submit"
                disabled={loading}
                className={`text-sm border border-blue-500 rounded p-2 w-full flex justify-center items-center gap-2 ${
                  loading
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-200 text-blue-500 hover:bg-blue-600 hover:text-white"
                } transition-colors`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Letting you in..
                  </>
                ) : (
                  <>
                    Join now
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
                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0ZM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
          <div className="text-xs mx-auto w-[40%] text-center text-gray-500 mt-4 max-sm:w-[100%]">
            By continuing you agree to terms and conditions, and terms of use
            for being a member of My campus service provided by HireScript
          </div>
        </div>
      )}
    </>
  );
};

export default Campus;
