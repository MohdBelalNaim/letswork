import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoBack from "./GoBack";
import { useDispatch, useSelector } from "react-redux";
import { showComponent } from "../redux/authSlice";
import JobCard from "./JobCard";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";
import Skeleton from "./Skeleton";
import JobCardSkeleton from "./JobCardSkeleton";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {
  fetchJobById,
  fetchSimilarJobs,
  checkJobSavedStatus,
  checkJobAppliedStatus,
  applyForJob,
  toggleJobSave,
  shareJob,
} from "../services/manageJobs";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [showMore, setShowMore] = useState(false);
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilar, setLoadingSimilar] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saveDocId, setSaveDocId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const handleWhatsapp = () => {
    if (!user) {
      dispatch(showComponent());
      return;
    }
    alert("WhatsApp group link is not available yet.");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadJobData = async () => {
      try {
        const jobData = await fetchJobById(id);
        setJob(jobData);
      } catch (err) {
        console.error("Error loading job:", err);
      } finally {
        setLoading(false);
      }
    };

    const loadSimilarJobs = async () => {
      try {
        const similarJobsData = await fetchSimilarJobs(id, 4);
        setSimilarJobs(similarJobsData);
      } catch (err) {
        console.error("Error loading similar jobs:", err);
      } finally {
        setLoadingSimilar(false);
      }
    };

    const checkSavedStatus = async () => {
      if (!user?.email) return;
      try {
        const { isSaved: savedStatus, saveDocId: docId } =
          await checkJobSavedStatus(id, user.email);
        setIsSaved(savedStatus);
        setSaveDocId(docId);
      } catch (err) {
        console.error("Error checking saved status:", err);
      }
    };
    

    loadJobData();
    loadSimilarJobs();
    checkSavedStatus();
    checkJobAppliedStatus();
  }, [id, user]);

  const handleApply = async () => {
    if (!user) {
      dispatch(showComponent());
      return;
    }

    if (isApplied) return; // Prevent multiple applications

    setApplying(true);
    try {
      const result = await applyForJob(job, user);
      if (result === "applied") {
        setIsApplied(true);
      }
    } catch (err) {
      console.error("Error in apply handler:", err);
    } finally {
      setApplying(false);
    }
  };

  const handleSaveToggle = async () => {
    if (!user) {
      dispatch(showComponent());
      return;
    }

    setSaving(true);
    try {
      const result = await toggleJobSave(job, user, isSaved, saveDocId);
      setIsSaved(result.isSaved);
      setSaveDocId(result.saveDocId);

      // If job was saved, refresh the saved status to get the correct saveDocId
      if (result.isSaved && !result.saveDocId) {
        const { isSaved: savedStatus, saveDocId: docId } =
          await checkJobSavedStatus(id, user.email);
        setSaveDocId(docId);
      }
    } catch (err) {
      console.error("Error in save toggle handler:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      await shareJob(job);
    } catch (err) {
      console.error("Error in share handler:", err);
    }
  };

  return (
    <div>
      {/* Job Detail Card */}
      <div className="grid gap-y-4 bg-white border border-gray-300 rounded-md p-4 md:p-6 mt-[5.5px]">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <div className="text-lg font-bold flex items-center gap-3 max-sm:text-sm">
              <GoBack />
              {job.title}
            </div>

            <div className=" flex justify-between text-sm text-gray-500 max-sm:text-xs">
              <div>
                {job.company} • {job.location}{" "}
              </div>
              <div>
                {" "}
                Posted:{" "}
                {job?.createdAt
                  ? timeAgo.format(new Date(job.createdAt.seconds * 1000))
                  : "Recently posted"}
              </div>
            </div>

            <div className="text-sm text-gray-700 max-w-full md:max-w-[100%] max-sm:text-xs">
              {showMore ? job.description : job.description.slice(0, 500)}
              <button
                className="text-blue-600 ml-2 hover:underline"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "See Less" : "See More"}
              </button>
            </div>

            <div className="font-bold text-blue-500 max-sm:text-sm">
              ₹ {job.salary} LPA
            </div>

            <div className="border-t border-gray-300 pt-4">
              <div className="py-2 text-sm font-medium max-sm:text-xs">
                Required Skills
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                {(job.skills || "").split(",").map((skill) => (
                  <span
                    key={skill}
                    className="border border-gray-400 px-3 py-1 rounded-md text-gray-400 max-sm:text-xs"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center max-sm:gap-x-2 max-sm:flex-wrap">
              <div className="flex gap-2">
                <button
                  onClick={handleApply}
                  disabled={isApplied || applying}
                  className={`cursor-pointer text-white text-sm px-4 py-2 rounded flex items-center gap-2 max-sm:text-xs max-sm:px-2 max-sm:py-2 transition-all ${
                    isApplied || applying
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {applying ? (
                    <>
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
                      Applying...
                    </>
                  ) : isApplied ? (
                    <>
                      Already applied
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      Apply now
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                        />
                      </svg>
                    </>
                  )}
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="hover:bg-blue-500 hover:text-white cursor-pointer text-sm bg-blue-100 border border-blue-500 text-blue-500 px-4 py-2 rounded flex items-center gap-2 max-sm:text-xs max-sm:px-2 max-sm:py-2"
                >
                  Share this job
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                    />
                  </svg>
                </button>
              </div>

              {/* Save */}
              <div>
                {saving ? (
                  <svg
                    className="animate-spin h-6 w-6 text-blue-500"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    onClick={handleSaveToggle}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isSaved ? "#3b82f6" : "none"}
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    className="size-6 cursor-pointer hover:scale-110 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 bg-white gap-4 flex items-center justify-between rounded-md border border-gray-300 p-5 max-sm:flex-col max-sm:py-2">
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

      {/* Similar Jobs */}
      <div>
        <div className="text-lg font-semibold py-4">Similar Jobs</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loadingSimilar
            ? Array.from({ length: 2 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))
            : similarJobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </div>
  );
};

export default Details;