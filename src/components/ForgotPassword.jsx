import React from "react";
import teamimage from "../assets/members.svg";
import forg from "../assets/Forgot password-rafiki.png";
const ForgotPassword = ({switchPage}) => (
    <div>
        <h2 className="font-medium mb-1">Forgot Password?</h2>
        <p className="text-xs mb-3">
            Enter your email address to reset your password.
        </p>
        <div className="flex justify-center">
            <img src={forg} alt="" className="size-85" />
        </div>
        <form className="grid gap-y-3">
            <input
                type="email"
                placeholder="Enter your email"
                className="text-sm border rounded border-gray-300 p-2 w-full"
            />

            <button
                type="button"
                className="text-sm text-white bg-blue-500 rounded p-2 w-full"

            >
                Send Reset Link
            </button>

            <div
                className="text-sm text-blue-500 text-center cursor-pointer mt-2"
                onClick={() => switchPage("login")}
            >
                Back to Login
            </div>
        </form>
    </div>
);

export default ForgotPassword;
