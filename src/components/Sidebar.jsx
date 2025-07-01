import React from "react";
import { sidebar } from "../sidebarhelper";

const Sidebar = () => {
  return (
    <div className="sticky top-10 border border-gray-300 flex p-2 flex-col justify-between h-[calc(100vh-122px)] bg-white rounded-lg text-black">
      <div>
        {sidebar.map((item, index) => {
          if (index === 0) {
            return (
              <div className="flex gap-2 items-center px-3 py-3 text-sm bg-blue-100 text-blue-500 rounded">
                {item.icon} {item.name}
              </div>
            );
          } else {
            return (
              <div className="flex gap-2 items-center px-3 py-3 text-sm">
                {item.icon} {item.name}
              </div>
            );
          }
        })}
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
