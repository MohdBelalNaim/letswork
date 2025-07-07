import React, { useState } from "react";
import { sidebar } from "../sidebarhelper";
import { Link, NavLink } from "react-router-dom";
const Sidebar = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="sticky top-10 border border-gray-300 flex p-2 flex-col justify-between h-[calc(100vh-122px)] bg-white rounded-lg text-black">
      <div>
        {sidebar.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex gap-2 items-center px-3 py-3 text-sm rounded cursor-pointer ${
                isActive ? "bg-blue-100 text-blue-500" : ""
              }`
            }
          >
            {item.icon} {item.name}
          </NavLink>
        ))}
        
      </div>
      <div className="flex gap-2 items-center px-3 py-3 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
          />
        </svg>
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
