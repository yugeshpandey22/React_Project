import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Trigger storage event for App.js to detect logout
    window.dispatchEvent(new Event('storage'));
    
    // Navigate to login page
    navigate('/login');
  };

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

        {/* Logout Button */}
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
