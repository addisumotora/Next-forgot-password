'use client'
import axios from 'axios';
import { useState } from 'react';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Password reset email sent. Please check your inbox.');
      } else {
        setMessage(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
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
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Forgot Password</h2>
          <p className="text-gray-500 mb-6">
            Enter your email and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                className={`w-full px-4 py-2 border ${
                  errorMessage ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-green-500`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
