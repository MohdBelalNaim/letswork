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
        <div className="flex gap-2 items-center px-3 py-3 text-sm rounded cursor-pointer">
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
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>
          Campus program
        </div>
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
