import {useState} from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLoginPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
    
      const navigate = useNavigate(); // Initialize useNavigate
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error when user types
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        try {
          console.log("Attempting login with:", formData);
          const response = await axios.post("http://localhost:5001/api/admin/login", formData);
          console.log("Login response:", response.data);
          
          if (response.data.token) {
            localStorage.setItem("adminToken", response.data.token);
            localStorage.setItem("admin", JSON.stringify(response.data.admin));
            navigate("/admin/admindashboard");
          } else {
            setError("Invalid response from server");
          }
        } catch (err) {
          console.error("Login error:", err);
          if (err.response?.status === 401) {
            setError("Invalid email or password");
          } else if (err.response?.data?.message) {
            setError(err.response.data.message);
          } else {
            setError("Login failed. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      };
    
      return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('https://media.istockphoto.com/id/2206023751/photo/young-entrepreneurs-running-a-laundry-service.jpg?s=612x612&w=0&k=20&c=C2nFvQp-aCmwhvacVfFNMBQXYhklTF3Z-M7HGoNX8Pk=')]">
          <div className="relative bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96 max-w-full">
    
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
            </div>
    
            {error && (
              <div className="mt-4 p-2 bg-red-100 text-red-600 rounded-md text-center">
                {error}
              </div>
            )}
    
            {/* Input Fields */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="flex items-center bg-gray-300 rounded-full px-4 py-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent outline-none px-2 flex-1 text-gray-700"
                  required
                />
              </div>
              <div className="flex items-center bg-gray-300 rounded-full px-4 py-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-transparent outline-none px-2 flex-1 text-gray-700"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-colors disabled:bg-red-400"
              >
                {loading ? "Signing in..." : "SIGN IN"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      );
}

export default AdminLoginPage;