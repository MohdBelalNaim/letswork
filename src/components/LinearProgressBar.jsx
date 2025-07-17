import React from "react";
import { useSelector } from "react-redux";
const LinearProgressBar = ({ height = 5, color = "#3b82f6", bgColor = "#e5e7eb" }) => {
  const userDetails = useSelector((state) => state.user.currentUser);
  const fieldsToConsider = ["name", "phoneNumber", "bio", "skills", "designation"];
  const totalFields = fieldsToConsider.length;
  const completedFields = fieldsToConsider.filter(
    (field) => userDetails?.[field] && userDetails[field].trim() !== ""
  ).length;
  const percent = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="w-full">
      <div
        className="rounded-full"
        style={{
          width: "100%",
          height: `${height}px`,
          backgroundColor: bgColor,
        }}
      >
        <div
          className="rounded-full transition-all duration-300"
          style={{
            width: `${percent}%`,
            height: "100%",
            backgroundColor: color,
          }}
        ></div>
      </div>
      <div className="text-xs mt-2" style={{ color }}>
        {percent}% complete
      </div>
    </div>
  );
};

export default LinearProgressBar;
