import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import './index.css';
import Navbar from "./Components/Navbar";  
import Routing from './Components/Utill/Routing';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const adminToken = localStorage.getItem('adminToken');
      
      setIsAuthenticated(!!token);
      setIsAdminAuthenticated(!!adminToken);
      
      console.log("Auth status:", { user: !!token, admin: !!adminToken });
    };

    checkAuth();
    
    // Listen for changes to localStorage
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Authentication paths where navbar should be hidden
  const authPaths = ['/login', '/signup', '/adminloginpage'];
  const adminPaths = ['/admin', '/admin/admindashboard', '/admin/orders', '/admin/customers'];
  
  // Only show navbar for authenticated regular users on non-admin paths
  const shouldShowNavbar = isAuthenticated && 
                          !authPaths.includes(location.pathname) && 
                          !adminPaths.includes(location.pathname);
  
  // If user is at root path and not authenticated, redirect to login
  if (location.pathname === '/' && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routing />
    </>
  );
}

export default App;
