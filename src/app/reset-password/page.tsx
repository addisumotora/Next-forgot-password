"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 flex flex-col lg:flex-row space-x-8 w-full max-w-4xl">
        <div className="hidden lg:flex items-center justify-center w-1/2">
          <img
            src="/image/pic.png"
            alt="Forgot Password Illustration"
            className="w-full h-auto"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8"
          >
            <h2 className="text-2xl mb-4">Reset Password</h2>
            <input
              type="password"
              className="w-full mb-4 px-4 py-2 border rounded-lg text-black"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Reset Password
            </button>
            {message && <p className="mt-4 text-red-500">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
