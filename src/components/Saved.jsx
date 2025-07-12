import React from "react";
import JobCard from "./JobCard";
import GoBack from "./GoBack";

const Saved = () => {
  
  return (
    <div>
      <div className="text-lg font-bold py-4 flex items-center gap-x-3 ">
       <GoBack />
        Saved jobs
      </div>
      <div className="grid lg:grid-cols-2 gap-2 md:grid-cols-1 max-sm:grid-cols-1 max-sm:gap-1">

        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </div>
  );
};

export default Saved;
 