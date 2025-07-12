import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebar } from "../sidebarhelper";
import { useNavigate, useLocation } from "react-router-dom";
import { logout as logoutAuth, showComponent } from "../redux/authSlice";
import { clearUser } from "../redux/userSlice";
import { auth } from "../firebase"; // Firebase Auth instance
import { signOut } from "firebase/auth";
import { persistor } from "../redux/store";
import toast from "react-hot-toast";

const Sidebar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const filteredSidebar = sidebar.filter((item) => {
    const protectedRoutes = ["/saved", "/visited"];
    return isLoggedIn || !protectedRoutes.includes(item.path);
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      dispatch(logoutAuth());
      await persistor.purge();
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  const user = useSelector((state) => state.user.currentUser);

  const handleNavigation = (path) => {
    if (path === "/account" && user == null) {
      dispatch(showComponent());
    } else {
      navigate(path);
    }
  };

  return (
    <div className="sticky top-10 border border-gray-300 flex p-2 flex-col justify-between h-[calc(100vh-122px)] bg-white rounded-lg text-black">
      <div>
        {filteredSidebar.map((item, index) => (
          <div
            className={`flex gap-2 items-center px-3 py-3 text-sm rounded cursor-pointer hover:bg-gray-100 mb-2 ${
              location.pathname === item.path ? "bg-blue-100 text-blue-500" : ""
            }`}
            key={index}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon} {item.name}
          </div>
        ))}
      </div>
      {isLoggedIn && (
        <div
          className="flex gap-2 items-center px-3 py-3 text-sm cursor-pointer text-red-500"
          onClick={handleLogout}
        >
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
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
          Logout
        </div>
      )}
    </div>
  );
};

export default Sidebar;
