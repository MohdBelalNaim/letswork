import React from "react";
import { Link, useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const nav = useNavigate();

  const handleShare = async () => {
    const shareData = {
      title: job?.title || "Check this job",
      text: `Check out this job: ${job?.title} at ${job?.company}`,
      url: `${window.location.origin}/details/${job?.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share cancelled or failed", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Sharing not supported in this browser.");
      }
    }
  };

  return (
    <div className="bg-white p-2 border rounded-md border-gray-300">
      <div className="flex gap-4 items-center">
        {job?.companyLogo ? (
          <img
            src={job?.companyLogo}
            alt={job?.title || "Job Logo"}
            className="size-[50px] rounded-md object-cover"
          />
        ) : (
          <div className="size-[50px] bg-gray-300 rounded-md" />
        )}

        <div>
          <div className="max-sm:text-sm font-medium truncate w-[200px]">
            {job?.title || "No Title"}
          </div>
          <div className="text-sm text-gray-500 max-sm:text-xs">
            {job?.company || "Unknown"} • {job?.location || "N/A"}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap text-xs gap-2 mt-3">
        {job?.type && (
          <div className="bg-gray-100 rounded px-1 py-1">{job?.type}</div>
        )}
        <div className="bg-gray-100 rounded px-1 py-1">
          {job?.experience || "Fresher"}
        </div>
        <div className="bg-gray-100 rounded px-1 py-1">
          {job?.mode || job?.remote ? "Remote" : "Onsite"}
        </div>
      </div>

      <div className="font-medium mt-3 max-sm:text-sm">
        ₹{job?.salary || "₹ -"} LPA
      </div>

      <div className="text-sm text-blue-500 flex items-center gap-2 mt-3 max-sm:text-xs cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
        Learn the skills required for this job
      </div>

      <div className="flex px-2 flex-wrap justify-between items-center text-sm mt-4 max-sm:text-xs">
        <div className="text-gray-500 ">
          {job?.createdAt
            ? new Date(job?.createdAt.seconds * 1000).toLocaleDateString()
            : "Recently posted"}
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/details/${job?.id || "123"}`}>
            <button className="hover:bg-blue-500 hover:text-white bg-blue-100 border border-blue-500 text-blue-500 px-4 py-2 text-sm rounded cursor-pointer max-sm:text-xs max-sm:px-2">
              See details
            </button>
          </Link>
          <svg
            onClick={handleShare}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
