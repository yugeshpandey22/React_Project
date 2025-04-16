import React, { useState } from "react";

const Orders = () => {
  // Sample Order Data
  const [orders, setOrders] = useState([
    {
      id: 1,
      order: 195752,
      name: "Abul Ali",
      email: "abul@gmail.com",
      contact: "01742583698",
      date: "Thu Jun 01",
      products: 3,
      status: "Order Picked",
    },
    {
      id: 2,
      order: 208434,
      name: "Tanish Sharma",
      email: "tanish@tanish.com",
      contact: "7878787878",
      date: "Fri Jun 09",
      products: 1,
      status: "Order Picked",
    },
    {
      id: 3,
      order: 853366,
      name: "Shivam Kumar",
      email: "skumar12@gmail.com",
      contact: "01783518058",
      date: "Sun Jun 04",
      products: 2,
      status: "Order Placed",
    },
    {
      id: 4,
      order: 726394,
      name: "Shreya",
      email: "shreya123@gmail.com",
      contact: "3456344355",
      date: "Sun Jun 11",
      products: 1,
      status: "Order Completed",
    },
    {
      id: 5,
      order: 306270,
      name: "Himanshu Kumar",
      email: "Himanshu@gmail.com",
      contact: "fdgdfgdfgfg",
      date: "Fri Jun 23",
      products: 2,
      status: "Order Completed",
    },
    {
      id: 6,
      order: 924780,
      name: "Mulindiva",
      email: "mulinpatrick@gmail.com",
      contact: "0751402092",
      date: "Sun Feb 05",
      products: 2,
      status: "Order Completed",
    },
    {
      id: 7,
      order: 592183,
      name: "Shashank kumar",
      email: "shashank999@gmail.com",
      contact: "+9188679607",
      date: "Tue Jun 20",
      products: 1,
      status: "Order Completed",
    },
  ]);

  // Function to update order status
  const updateStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>

      {/* Orders Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Order</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Products</th>
            <th className="border p-2">View</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{order.order}</td>
              <td className="border p-2">{order.name}</td>
              <td className="border p-2">{order.email}</td>
              <td className="border p-2">{order.contact}</td>
              <td className="border p-2">{order.date}</td>
              <td className="border p-2">{order.products}</td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  View Details
                </button>
              </td>
              <td className="border p-2 flex items-center justify-center space-x-2">
                {/* Order Status Dropdown */}
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className={`px-2 py-1 rounded ${
                    order.status === "Order Picked"
                      ? "bg-purple-500 text-white"
                      : order.status === "Order Placed"
                      ? "bg-orange-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  <option value="Order Picked">Order Picked</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Order Completed">Order Completed</option>
                </select>

                {/* Edit Button */}
                <button className="bg-orange-400 text-white px-2 py-1 rounded">
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
