import React from 'react'

const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 rounded w-1/2" />
    <div className="h-4 bg-gray-200 rounded w-1/3" />
    <div className="h-24 bg-gray-200 rounded w-full" />
    <div className="h-6 bg-gray-200 rounded w-1/4" />
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-6 bg-gray-200 rounded w-20" />
      ))}
    </div>
    <div className="flex gap-4 mt-2">
      <div className="h-10 w-32 bg-gray-200 rounded" />
      <div className="h-10 w-32 bg-gray-100 rounded" />
    </div>
  </div>
  )
}

export default Skeleton
