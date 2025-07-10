import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthGuard = ({ children, redirectPath = "/" }) => {
  const user = useSelector(state=>state.user.currentUser);
  useEffect(() => {
    if (!user || (typeof user === "object" && Object.keys(user).length === 0)) {

      window.location.href = redirectPath;
    }
  }, [user, redirectPath]);

  if (!user || (typeof user === "object" && Object.keys(user).length === 0)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Redirecting...</div>
      </div>
    );
  }
  return children;
};

export default AuthGuard;
