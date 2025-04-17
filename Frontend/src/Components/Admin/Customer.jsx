import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/customers');
      setCustomers(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:5001/api/customers/${id}`);
        setCustomers(prev => prev.filter(customer => customer._id !== id));
      } catch (err) {
        alert("Failed to delete customer: " + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-teal-50 p-6 flex items-center justify-center">
        <div className="text-xl">Loading customers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-teal-50 p-6 flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">All Customers</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              {/* <th className="py-2 px-4 border">Contact</th>
              <th className="py-2 px-4 border">Room / Flat</th>
              <th className="py-2 px-4 border">Road</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer._id} className="text-center border-b">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{customer.name}</td>
                <td className="py-2 px-4 border">{customer.email}</td>
                {/* <td className="py-2 px-4 border">{customer.contact}</td>
                <td className="py-2 px-4 border">{customer.room}</td>
                <td className="py-2 px-4 border">{customer.road}</td>
                <td className="py-2 px-4 border">{customer.address}</td> */}
                <td className="py-2 px-4 border space-x-2">
                  <button
                    className="bg-pink-500 text-white px-3 py-1 rounded"
                    onClick={() => alert("Send Email functionality not implemented yet")}
                  >
                    Send Email
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(customer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
