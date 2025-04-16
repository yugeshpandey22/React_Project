import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import Services from "../Services";
import Dashboard from "../Dashboard";
import Login from "../Login";
import SignUp from "../SignUp";
import AdminPanel from "../Admin/AdminPanel";
import AdminLoginPage from "../Admin/AdminLoginPage";
import Orders from "../Admin/Order";
import Customers from "../Admin/Customer";
import AdminDashboard from "../Admin/AdminDashboard";

const Routing = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Admin Routes */}
      <Route path="/adminloginpage" element={<AdminLoginPage />} />

      {/* Nested Admin Panel Routes */}
      <Route path="/admin" element={<AdminPanel />}>
        <Route path="admindashboard" element={<AdminDashboard/>} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
      </Route>
    </Routes>
  );
};

export default Routing;
