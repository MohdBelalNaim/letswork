import React from 'react'

const JobCardSkeleton = () => {
  return (
    <div className="animate-pulse border border-gray-300 p-4 bg-white rounded-md space-y-2">
    <div className="h-4 bg-gray-200 w-1/2 rounded" />
    <div className="h-4 bg-gray-200 w-1/3 rounded" />
    <div className="h-16 bg-gray-100 w-full rounded" />
    <div className="h-6 bg-gray-200 w-1/4 rounded" />
  </div>
  )
}

export default JobCardSkeleton
