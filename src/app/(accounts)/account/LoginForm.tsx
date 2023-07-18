"use client";

import React from "react";

export default function LoginForm() {

  const handleLogin = () => {
    console.log("login");
  };

  return (
    <div className="LoginForm">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
          </div>
          <a href="##" className="text-sm">
            Forgot password?
          </a>
        </div>
        <button
          onClick={handleLogin}
          type="submit"
          className="bg-primary-500 text-white py-2 rounded-md text-sm font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}