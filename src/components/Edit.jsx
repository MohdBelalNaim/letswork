import React from "react";

const Edit = ({controller}) => {
  var fields = ["Full name", "Email", "Phone number", "Skills", "Bio"];

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
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4 cursor-pointer"
              onClick={() => controller(false)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div>
            {fields.map((field, index) => (
              <div className="flex flex-col gap-2 mt-3" key={index}>
                <label htmlFor="" className="text-sm">
                  {field}
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 focus:outline-blue-500 text-sm"
                  placeholder={`Enter your ${field.toLowerCase()}`}
                />
              </div>
            ))}
            <button className="w-full bg-blue-500 text-white text-sm p-2 rounded mt-2">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
