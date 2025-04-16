import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate(); // Initialize navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/959402152/photo/industrial-laundry-machines.jpg?s=612x612&w=0&k=20&c=xNHLUgqfnN3XLLtof4x8An52k4AKVCnU5oCU2cPcfgc=')",
      }}
    >
      <div className="relative bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold text-gray-800">Sign up</h2>

        {/* Input Fields */}
        <div className="mt-4 space-y-4">
          {/* Name Input */}
          <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 border border-gray-300">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent outline-none px-2 flex-1 text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 border border-gray-300">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent outline-none px-2 flex-1 text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 border border-gray-300">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-none px-2 flex-1 text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 border border-gray-300">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-transparent outline-none px-2 flex-1 text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Sign Up Button */}
        <button className="mt-6 mb-8 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold transition duration-300">
          SIGN UP
        </button>

        {/* Curved Red Bottom Section */}
        <div className="relative mt-6">
          <div className="absolute -bottom-10 left-0 w-full h-20 bg-red-500 rounded-t-full flex justify-center items-center">
            <button
              onClick={() => navigate("/login")} // Navigate to Sign In page
              className="border border-white text-white px-4 py-1 rounded-full font-semibold hover:bg-white hover:text-red-500 transition duration-300"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
