import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const data = [
  { day: "Saturday", Order_Placed: 4, Order_Completed: 2 },
  { day: "Sunday", Order_Placed: 3, Order_Completed: 1 },
  { day: "Monday", Order_Placed: 2, Order_Completed: 1 },
  { day: "Tuesday", Order_Placed: 3, Order_Completed: 3 },
  { day: "Wednesday", Order_Placed: 2, Order_Completed: 2 },
  { day: "Thursday", Order_Placed: 3, Order_Completed: 1 },
  { day: "Friday", Order_Placed: 2, Order_Completed: 1 },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-teal-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      {/* Order Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-red-500 text-white p-4 rounded flex flex-col items-center">
          <h2 className="text-3xl font-bold">114</h2>
          <p>Total Orders</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded flex flex-col items-center">
          <h2 className="text-3xl font-bold">84</h2>
          <p>Order Pending</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded flex flex-col items-center">
          <h2 className="text-3xl font-bold">30</h2>
          <p>Order Completed</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded flex flex-col items-center">
          <h2 className="text-3xl font-bold">73987</h2>
          <p>Total Earning</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Weekly Orders Bar Chart */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Weekly Orders</h2>
          <BarChart width={450} height={250} data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Order_Placed" fill="#8884d8" />
            <Bar dataKey="Order_Completed" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Business Report Circular Chart */}
        <div className="bg-white p-6 rounded shadow-md flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Business Report</h2>
          <CircularProgressbar
            value={70}
            text={`70%`}
            styles={buildStyles({ pathColor: "#4CAF50", textColor: "#000" })}
          />
        </div>
      </div>

   
    </div>
  );
};

export default AdminDashboard;
