import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoBack from "./GoBack";
import { FaWhatsapp } from "react-icons/fa";
import Skeleton from "./Skeleton";
import { fetchCourseById, fetchSimilarCourses } from "../services/manageCourses";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import JobCardSkeleton from "./JobCardSkeleton";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";

const CourseDetail = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const { id } = useParams();
    const [course, setCourse] = useState(null)
    const [showMore, setshowMore] = useState(false)
    TimeAgo.addDefaultLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const [loading, setLoading] = useState(true);
    const [SimilarCourses, setSimilarCourses] = useState([])

    const handleregister = async () => {
        if (!user) {
            dispatch(showComponent());
            return;
        }
        else {
            toast.success("Registered")
        }
    };
    const handleWhatsapp = () => {
        if (!user) {
            dispatch(showComponent());
            return;
        }
        alert("WhatsApp group link is not available yet.");
    };
    useEffect(() => {
        window.scrollTo(0, 0);

        const loadCourseData = async () => {
            try {
                const CourseData = await fetchCourseById(id);
                setCourse(CourseData);
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

    }, [id]);
    console.log(SimilarCourses)

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

                        <div className="text-sm text-gray-700 max-w-full md:max-w-[100%] max-sm:text-xs">
                            {showMore ? course.description : course.description.slice(0, 250)}
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
                                        className="bg-gray-100 px-2 py-1 rounded-md text-gray-800 max-sm:text-xs"
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
                                <button onClick={handleregister} className=" w-full mt-4 px-4 bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 transition">
                                    Register Now
                                </button>

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
