import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import GoBack from "./GoBack";
import { useDispatch, useSelector } from "react-redux";
import { showComponent } from "../redux/authSlice";
import JobCard from "./JobCard";
import { saveJob } from "../services/manageJobs";
import toast from "react-hot-toast";
import Skeleton from "./Skeleton";
import JobCardSkeleton from "./JobCardSkeleton";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilar, setLoadingSimilar] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saveDocId, setSaveDocId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchJob = async () => {
      try {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobs = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== id) jobs.push({ id: doc.id, ...doc.data() });
        });
        setSimilarJobs(jobs.slice(0, 4));
      } catch (err) {
        console.error("Error fetching similar jobs:", err);
      } finally {
        setLoadingSimilar(false);
      }
    };

    const checkSavedStatus = async () => {
      if (!user?.email) return;
      const q = query(
        collection(db, "jobsManage"),
        where("user.email", "==", user.email),
        where("type", "==", "Saved"),
        where("job.id", "==", id)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setIsSaved(true);
        setSaveDocId(snapshot.docs[0].id);
      }
    };

    fetchJob();
    fetchSimilarJobs();
    checkSavedStatus();
  }, [id, user]);

  const handleApply = async () => {
    if (!user) {
      dispatch(showComponent());
      return;
    }
    try {
      await saveJob(job, user, "Applied");
      window.open(job.applyLink, "_blank");
    } catch (err) {
      toast.error("Error applying: " + err.message);
    }
  };

  const handleSaveToggle = async () => {
    if (!user) {
      dispatch(showComponent());
      return;
    }

    setSaving(true);
    try {
      if (isSaved && saveDocId) {
        await deleteDoc(doc(db, "jobsManage", saveDocId));
        setIsSaved(false);
        setSaveDocId(null);
        toast.success("Job unsaved");
      } else {
        const newDocId = await saveJob(job, user, "Saved");
        setIsSaved(true);
        setSaveDocId(newDocId);
        toast.success("Job saved");
      }
    } catch (err) {
      toast.error("Error saving job: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: job.title,
      text: `Check out this ${job.title} job at ${job.company}!`,
      url: `${window.location.origin}/details/${job.id}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      toast.error("Error sharing: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Job Detail Card */}
      <div className="grid gap-y-4 bg-white border border-gray-300 rounded-md p-4 md:p-6">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <div className="text-lg font-bold flex items-center gap-3">
              <GoBack />
              {job.title}
            </div>

            <div className="text-sm text-gray-500 max-sm:text-xs">
              {job.company} • {job.location}
            </div>

            <div className="text-sm text-gray-700 max-w-full md:max-w-[100%] max-sm:text-xs">
              {job.description}
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
                    className="bg-gray-100 px-2 py-1 rounded-md text-gray-800 max-sm:text-xs"
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
                  className="cursor-pointer text-white bg-blue-500 text-sm px-4 py-2 rounded flex items-center gap-2 max-sm:text-xs max-sm:px-2 max-sm:py-1"
                >
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
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="hover:bg-blue-500 hover:text-white cursor-pointer text-sm bg-blue-100 border border-blue-500 text-blue-500 px-4 py-2 rounded flex items-center gap-2 max-sm:text-xs max-sm:px-2 max-sm:py-1"
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

      {/* Similar Jobs */}
      <div>
        <div className="text-lg font-semibold mb-2">Similar Jobs</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
