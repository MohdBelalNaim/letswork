import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoBack from "./GoBack";
import { FaWhatsapp } from "react-icons/fa";
import Skeleton from "./Skeleton";
import { fetchCourseById, fetchSimilarCourses } from "../services/manageCourses";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import toast from "react-hot-toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MdEventSeat } from "react-icons/md";
import { useDispatch } from "react-redux";
import JobCardSkeleton from "./JobCardSkeleton";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import { arrayUnion } from "firebase/firestore";
import { showComponent } from "../redux/authSlice";


const CourseDetail = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const { id } = useParams();
    const [course, setCourse] = useState(null)
    const [showMore, setshowMore] = useState(false)
    TimeAgo.addDefaultLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const [loading, setLoading] = useState(true);
    const [SimilarCourses, setSimilarCourses] = useState([]);
    const userEmail = user?.email;
    console.log("User:", userEmail)

    const [disabled, setdisabled] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false);
    const [totalRegistered, setTotalRegistered] = useState(0);


    const handleRegister = async (courseId) => {
        if (!userEmail) {
            dispatch(showComponent());
            return;
        }
        setButtonLoading(true);
        try {
            const courseRef = doc(db, "courses", courseId);
            const courseSnap = await getDoc(courseRef);
            const data = courseSnap.data();
            console.log(data?.registeredEmails?.[userEmail])
            const registered = data?.registeredEmails || [];

            if (registered.includes(userEmail)) {
                toast.error("You're already registered for this course.");
                setButtonLoading(false);
                return;
            }

            await updateDoc(courseRef, {
                registeredEmails: arrayUnion(userEmail),
            });

            toast.success("Successfully registered!");
            setdisabled(true);
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Registration failed. Please try again.");
        }
        finally {
            setButtonLoading(false);
        }
    };
    const handleWhatsapp = () => {
        if (!user) {
            dispatch(showComponent());
            return;
        }
        const whatsappGroupLink = "https://chat.whatsapp.com/JhXYXasBWB2FJailZ6JFqH?mode=r_c "; // Replace with your actual WhatsApp group link
        window.open(whatsappGroupLink, "_blank");

    };
    useEffect(() => {
        window.scrollTo(0, 0);

        const loadCourseData = async () => {
            try {
                const CourseData = await fetchCourseById(id);
                setCourse(CourseData);
                const isRegistered = CourseData?.registeredEmails?.includes(userEmail);
                setdisabled(isRegistered);
                setTotalRegistered(CourseData?.registeredEmails?.length || 0);
            } catch (err) {
                console.error("Error loading course:", err);
            } finally {
                setLoading(false);
            }
        };
        const loadSimilarCourses = async () => {
            try {
                const similarJobsData = await fetchSimilarCourses(id, 5);
                setSimilarCourses(similarJobsData);
            } catch (err) {
                console.error("Error loading similar jobs:", err);
            }
        };

        loadCourseData();
        loadSimilarCourses();


    }, [id, userEmail]);


    const hasCourseStarted = (startDate) => { //doubt
        console.log("Start Date:", startDate);
        if (!startDate) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

        const [day, month, year] = startDate.split("-").map(Number);
        const courseDate = new Date(year, month - 1, day);  // month - 1 because JS months are 0-indexed

        console.log("Course Date:", today.toDateString());
        today.setHours(0, 0, 0, 0); // Set time to midnight for comparison
        console.log(today.toDateString() >= courseDate.toDateString());
        return today.toDateString() >= courseDate.toDateString();
    };



    return (
        <div>
            {/* Course Detail Card */}
            <div className="grid gap-y-4 bg-white border border-gray-300 rounded-md p-4 md:p-6 mt-[5.5px] mb-4">
                {loading ? (
                    <Skeleton />
                ) : (
                    <>
                        <div className="text-lg font-bold flex items-center gap-3 max-sm:text-sm">
                            <GoBack />
                            {course.courseName}
                        </div>



                        <div className=" flex justify-between text-sm text-gray-500 max-sm:text-xs">
                            <div>
                                By {course.instructor}
                            </div>
                            <div>
                                Starting on {course.startDate}
                            </div>
                        </div>

                        <div className="text-sm flex items-center  gap-2 text-yellow-800  
 ">
                            <MdEventSeat size={20} />
                            {course.seatsLeft - totalRegistered} Seats Left
                        </div>

                        <div className="text-sm text-gray-700 max-w-full md:max-w-[100%] max-sm:text-xs">
                            {showMore ? (
                                <div dangerouslySetInnerHTML={{ __html: course.description }} />
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: course.description.slice(0, 500) + "...",
                                    }}
                                />
                            )}
                            <button
                                className="text-blue-600 ml-2 hover:underline"
                                onClick={() => setshowMore(!showMore)}
                            >
                                {showMore ? "See Less" : "See More"}
                            </button>
                        </div>
                        <div className="py-2 text-sm text-gray-800 font-medium max-sm:text-xs">
                            What you will learn
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm">

                            <div className="flex flex-wrap gap-2 text-sm">
                                {(course.technologies || "").split(",").map((technologies) => (
                                    <span
                                        key={technologies}
                                        className="border border-gray-400 px-3 py-1 rounded-md text-gray-400 max-sm:text-xs"
                                    >
                                        {technologies.trim()}
                                    </span>
                                ))}
                            </div>

                        </div>
                        <div className="py-2 font-bold text-blue-500 max-sm:text-sm">
                            Course Fee: ₹ {course.price}
                        </div>



                        {/* Buttons */}
                        <div className="flex justify-between items-center max-sm:gap-x-2 max-sm:flex-wrap">
                            <div className="flex gap-2">
                                {buttonLoading ? (
                                    <button
                                        disabled
                                        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md flex justify-center items-center gap-2 cursor-wait"
                                    >
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="animate-spin h-4 w-4"
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
                                                    d="M4 12a8 8 0 018-8v8H4z"
                                                />
                                            </svg>

                                            Registering... </div>
                                    </button>
                                ) : disabled ? (
                                    hasCourseStarted(course.startDate) ? (
                                        course.link ? (
                                            <a
                                                href={course.link || '#'} //doubt
                                                target="_blank"
                                                className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md text-center"
                                            >
                                                Join Now
                                            </a>
                                        ) : (
                                            <button
                                                disabled
                                                className="w-full mt-4 px-4 py-2 bg-gray-400 text-white text-sm font-medium rounded-md cursor-not-allowed"
                                            >
                                                Join Link Not Available
                                            </button>
                                        )
                                    ) : (
                                        <button
                                            disabled
                                            className="w-full mt-4 px-4 py-2 bg-gray-400 text-white text-sm font-medium rounded-md cursor-not-allowed"
                                        >
                                            Already Registered
                                        </button>
                                    )
                                ) : (
                                    <button
                                        onClick={() => handleRegister(course.id)}
                                        className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition"
                                    >
                                        Register Now
                                    </button>
                                )}
                            </div>


                        </div>
                    </>
                )}
            </div>

            <div className="mt-2 bg-white gap-4 flex items-center justify-between rounded-md border border-gray-300 p-5 max-sm:flex-col max-sm:py-2">
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
                <button onClick={handleWhatsapp} className="bg-green-200 max-sm:text-xs max-sm:mb-3 max-sm:w-full px-5 py-1.5 rounded-full text-sm text-green-600 border border-green-600 font-bold cursor-pointer hover:bg-green-600 hover:text-white">
                    Join
                </button>
            </div>

            {/* Similar Courses */}
            <div>
                <div className="text-lg font-semibold py-4">Similar Courses</div>
                <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
                        : SimilarCourses.map((courses) => <CourseCard key={courses.id} courses={courses} />)}
                </div>
            </div>
        </div>
    )
}

export default CourseDetail
