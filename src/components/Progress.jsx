import React from "react";
import { useSelector } from "react-redux";

const CircularProgress = ({ color = "#3b82f6", size = 120, strokeWidth = 6 }) => {
  const userDetails = useSelector((state) => state.user.currentUser);
  const fieldsToConsider = ["name", "phoneNumber", "bio", "skills", "designation"];
  const totalFields = fieldsToConsider.length;
  const completedFields = fieldsToConsider.filter(
    (field) => userDetails?.[field] && userDetails[field].trim() !== ""
  ).length;
  const percent = Math.round((completedFields / totalFields) * 100);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center text-lg font-bold"
          style={{ color }}
        >
          {percent}%
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
