import React, { useState } from "react";
import GoogleLogin from "./GoogleLogin";
import signin from "../assets/signin.svg";
import { useDispatch } from "react-redux";
import { hideComponent, login } from "../redux/authSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/createUser";
import { setUser } from "../redux/userSlice";
import Spinner from "./Spinner";
const Login = ({ switchPage }) => {
  const [next, setNext] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleLogin = async (userData) => {
    setLoading(true);
    let data = await loginUser(userData);
    if (data.success) {
      dispatch(setUser(data.user));
      dispatch(hideComponent());
      dispatch(login());
      setLoading(false);
      toast.success(data.message);
    } else {
      setError(data.message);
      setLoading(false);
    }
  };

  const handleNext = () => {
    alert("called")
    if (email !== "") {
      setNext(true);
    }
  }

  return (
    <div>
      <div className="font-medium">Sign in to your HireScript account!</div>
      <div className="text-xs mt-1">
        Sign in to your HireScript account to apply for jobs, manage your
        profile, and get personalized job recommendations.
      </div>
      <div className="flex justify-center">
        <img src={signin} alt="" className="size-85" />
      </div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="grid gap-y-3">
          <input
            type="text"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm border rounded border-gray-300 p-2 w-full"
            {...register("email", { required: true })}
          />

          {next && (
            <>
              <input
                type="password"
                placeholder="Enter your password"
                className="text-sm border rounded border-gray-300 p-2 w-full"
                {...register("password", { required: true })}
              />
              <button
                className="text-sm text-start cursor-pointer hover:text-gray-500"
                onClick={() => switchPage("forgot")}
              >
                Forgot Password?
              </button>
              {error && <div className="text-sm text-red-500">{error}</div>}
            </>
          )}
          {next ? (
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer text-sm text-white rounded  p-2 w-full ${
                loading ? "bg-blue-200" : "bg-blue-500"
              }`}
            >
              {loading ? <Spinner /> : "Login"}
            </button>
          ) : (
            <button
              onClick={() => handleNext()}
              className="cursor-pointer text-sm text-white bg-blue-500 rounded  p-2 w-full"
            >
              Next
            </button>
          )}
          <div className="text-center">or</div>
          <GoogleLogin />
        </div>
      </form>
    </div>
  );
};

export default Login;
