import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
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

// Protected Route component to check if user is authenticated
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Admin Protected Route component to check if admin is authenticated
const AdminProtectedRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('adminToken') !== null;
  const location = useLocation();

  if (!isAdminAuthenticated) {
    // Redirect to admin login page
    return <Navigate to="/adminloginpage" state={{ from: location }} replace />;
  }

  return children;
};

// PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

AdminProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

const Routing = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/adminloginpage" element={<AdminLoginPage />} />

      {/* Protected Routes - Require authentication */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/services" 
        element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* Admin Protected Routes */}
      <Route 
        path="/admin" 
        element={
          <AdminProtectedRoute>
            <AdminPanel />
          </AdminProtectedRoute>
        }
      >
        <Route path="admindashboard" element={<AdminDashboard/>} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
      </Route>

      {/* Default route - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Routing;
