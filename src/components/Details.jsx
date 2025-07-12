import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import GoBack from "./GoBack";
import { useDispatch, useSelector } from "react-redux";
import { showComponent } from "../redux/authSlice";
import JobCard from "./JobCard";
import { saveJob } from "../firebase";
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

    fetchJob();
    fetchSimilarJobs();
  }, [id]);

  const handleApply = (type) => {
    if (!user) {
      dispatch(showComponent());
      return;
    }
    try{
        const jobId = saveJob(job, user, type);
        toast.success(`Job ${type} successfully!`);
      } catch (err) {
        toast.err("Error saving job: " + err.message);
      }
    setTimeout(() => {
      if (job?.applyLink) {
      window.open(job.applyLink, "_blank");
    } else {
      alert("Job link is not available yet.");
    }
    }, 4000);
  };

  async function handleJob(type) {
      try{
        const jobId = await saveJob(job, user, type);
        alert(`Job ${type} successfully!`);
      } catch (err) {
        alert("Error saving job: " + err.message);
      } finally {
        alert("Finally!");
      }
    }
  
  return (
    <div className="space-y-6">
      <div className="grid gap-y-4 bg-white border border-gray-300 rounded-md p-4 md:p-6" style={{ marginBottom: "8px" }}>
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
            <div className="text-sm text-gray-700 max-w-full md:max-w-[60%] max-sm:text-xs">
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
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => handleApply("Applied")}
                className="cursor-pointer max-sm:text-xs text-white bg-blue-500 text-sm  px-4 py-2 rounded flex items-center gap-2"
              >
                Apply now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
              </button>
              <button className="max-sm:text-xs hover:bg-blue-500 hover:text-white cursor-pointer text-sm bg-blue-100 border border-blue-500 text-blue-500 px-4 py-2 rounded flex items-center gap-2">
                Share this job
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
                
              </button>
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
