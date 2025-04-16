import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-red-600">Laundry Website</h1>

        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "tomato" : "",
            fontWeight: isActive ? "bold" : "",
          })}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "tomato" : "",
            fontWeight: isActive ? "bold" : "",
          })}
          to="/services"
        >
          Services
        </NavLink>

        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "tomato" : "",
            fontWeight: isActive ? "bold" : "",
          })}
          to="/dashboard"
        >
          Dashboard
        </NavLink>

        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "tomato" : "",
            fontWeight: isActive ? "bold" : "",
          })}
          to="/login"
        >
          Login
        </NavLink>

        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "tomato" : "",
            fontWeight: isActive ? "bold" : "",
          })}
          to="/signup"
        >
          Sign Up
        </NavLink>

        {/* Book Now Button */}
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/login")} // Navigate to login page
        >
          Book Now
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
