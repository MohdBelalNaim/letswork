import React, { useState } from "react";
import forg from "../assets/Forgot password-rafiki.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPassword = ({ switchPage }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    setMessage("");
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset link sent! Check your email.");
    } catch (error) {
      setMessage(error.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium mb-1">Forgot Password?</h2>
      <p className="text-xs mb-3">
        Enter your email address to reset your password.
      </p>

      <div className="flex justify-center">
        <img src={forg} alt="Forgot password" className="size-85" />
      </div>

      <form
        className="grid gap-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleReset();
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-sm border rounded border-gray-300 p-2 w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className={`text-sm text-white rounded p-2 w-full ${
            loading ? "bg-blue-300" : "bg-blue-500"
          }`}
        >
          {loading ? "Sending reset link..." : "Reset password"}
        </button>

        {message && (
          <div className="text-sm text-center text-blue-500">{message}</div>
        )}

        <div
          className="text-sm text-blue-500 text-center cursor-pointer mt-2"
          onClick={() => switchPage("login")}
        >
          Back to Login
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
