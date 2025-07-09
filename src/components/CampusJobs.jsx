import React from 'react'
import JobCard from './JobCard'
import { useEffect } from 'react'
const CampusJobs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>
      <div className="">

            <div className="font-bold text-lg py-2 mt-2">
              Jobs for Integral university
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
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
            </div>
          </div>
    </div>
  )
}

export default CampusJobs
