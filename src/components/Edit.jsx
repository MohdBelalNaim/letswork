import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../services/createUser";
import { setUser } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";

const Edit = ({ controller }) => {
  var field = [
    {
      title: "Full name",
      name: "fullname",
    },
    {
      title: "Designation",
      name: "designation",
    },
    {
      title: "Phone number",
      name: "phone",
    },
    {
      title: "Skills (Comma separated)",
      name: "skills",
    },
    {
      title: "Bio",
      name: "bio",
    },
  ];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullname: user?.name || "",
      phone: user?.phone || "",
      skills: user?.skills || "",
      bio: user?.bio || "",
      designation: user?.designation || "",
      phone: user?.phoneNumber || "",
    },
  });
  const [loading, setLoading] = useState(false);
  async function handleUpdate(data) {
      if (data.skills) {
    data.skills = data.skills
      .split(",")                     
      .map((skill) => skill.trim())       
      .filter((skill) => skill !== "")    
      .join(",");                         
  }
    setLoading(true);
    let result = await updateUserProfile(data, user);
    if (result.success) {
      controller(false);
      dispatch(setUser(result.user));
      toast.success("Profile updated successfully!");
      controller(false);
      setLoading(false);
    } else {
      alert(result.message || "Failed to update profile.");
      console.error("Update error:", result.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <div
        className="inset-0 bg-black/30 backdrop-blur-md fixed
     z-[9999999] grid place-items-center overflow-scroll max-sm:py-4"
      >
        <div className="rounded-md bg-white w-[460px] p-4">
          <div className="font-bold flex justify-between">
            Edit your profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 cursor-pointer"
              onClick={() => controller(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div>
            <form onSubmit={handleSubmit(handleUpdate)}>
              {field.map((field, index) => (
                <div className="flex flex-col gap-2 mt-3" key={index}>
                  <label htmlFor="" className="text-sm">
                    {field.title}
                  </label>
                  <input
                    {...register(field.name)}
                    type="text"
                    className="border border-gray-300 rounded-md p-2 focus:outline-blue-500 text-sm"
                    placeholder={`Enter your ${field.title}`}
                  />
                </div>
              ))}
              <button
                className={`w-full cursor-pointer text-white text-sm p-2 rounded mt-2 ${
                  loading ? "bg-blue-200" : "bg-blue-500"
                }`}
                disabled={loading}
              >
                {!loading ? "Update" : <Spinner />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
