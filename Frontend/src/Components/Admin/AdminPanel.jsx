import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin authentication data
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    
    // Trigger storage event for App.js to detect logout
    window.dispatchEvent(new Event('storage'));
    
    // Navigate to admin login page
    navigate("/adminloginpage");
  };

  return (
    <div className="min-h-screen bg-teal-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-500 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold">Smart Dhopa</h2>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/admindashboard"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? "bg-white text-teal-500" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? "bg-white text-teal-500" : ""}`
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/customers"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? "bg-white text-teal-500" : ""}`
              }
            >
              Customers
            </NavLink>
          </li>
        </ul>
        <div className="mt-auto pt-10">
          <button
            onClick={handleLogout}
            className="bg-red-600 w-full px-4 py-2 rounded text-white hover:bg-red-700 transition-colors"
          >
            Admin Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
