import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const isAdmin = true; // You can replace this with real authentication check

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      const timer = setTimeout(() => setUpdateSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [updateSuccess]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/orders");
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders. Try again later.");
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      if (!newStatus) throw new Error("Please select a valid status");
      if (!window.confirm(`Are you sure you want to mark this order as '${newStatus}'?`)) return;

      setUpdatingStatus(id);
      const url = `http://localhost:5001/api/orders/update-status/${id}`;
      const payload = { status: newStatus };

      await axios.post(url, payload);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );

      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      setUpdateSuccess(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update status";
      alert(`Update failed: ${errorMessage}`);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getAvailableStatusOptions = (currentStatus) => {
    const statuses = ["Order Placed", "Order Picked", "Order Completed"];
    return statuses.filter((s) => s !== currentStatus);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Order Placed": return "bg-orange-500";
      case "Order Picked": return "bg-purple-500";
      case "Order Completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  if (loading) return <p className="p-4 text-center">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Orders</h2>
        <button 
          onClick={fetchOrders} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Refresh Orders
        </button>
      </div>

      {updateSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <span>Order status updated successfully!</span>
          <button onClick={() => setUpdateSuccess(false)} className="text-green-700">×</button>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Order Number</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Contact</th>
            {/* <th className="border p-2">Service Date</th> */}
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{order.orderNumber}</td>
                <td className="border p-2">{order.customerName}</td>
                <td className="border p-2">{order.customerEmail}</td>
                <td className="border p-2">{order.customerContact}</td>
                {/* <td className="border p-2">{order.serviceDate}</td> */}
                <td className="border p-2">₹{order.amount}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded text-white ${getStatusBadgeClass(order.status)}`}>
                    {order.status || "Processing"}
                  </span>
                </td>
                <td className="border p-2">
                  <div className="flex items-center justify-center space-x-2">
                    <button 
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                    {isAdmin && (
                      <div className="relative">
                        <select
                          value=""
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className={`px-2 py-1 rounded border ${updatingStatus === order._id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          disabled={updatingStatus === order._id || getAvailableStatusOptions(order.status).length === 0}
                        >
                          <option value="" disabled>Update Status</option>
                          {getAvailableStatusOptions(order.status).map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {updatingStatus === order._id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="border p-4 text-center">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Order #{selectedOrder.orderNumber}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Order Status</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded text-white ${getStatusBadgeClass(selectedOrder.status)}`}>
                    {selectedOrder.status || "Processing"}
                  </span>
                  {isAdmin && (
                    <select
                      value=""
                      onChange={(e) => updateStatus(selectedOrder._id, e.target.value)}
                      className={`px-2 py-1 rounded border ${updatingStatus === selectedOrder._id ? 'opacity-50' : ''}`}
                      disabled={updatingStatus === selectedOrder._id || getAvailableStatusOptions(selectedOrder.status).length === 0}
                    >
                      <option value="" disabled>Change Status</option>
                      {getAvailableStatusOptions(selectedOrder.status).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                  {updatingStatus === selectedOrder._id && (
                    <div className="w-4 h-4 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Customer Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-50 p-3 rounded">
                <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                <p><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                <p><span className="font-medium">Contact:</span> {selectedOrder.customerContact}</p>
                <p><span className="font-medium">Service Date:</span> {selectedOrder.serviceDate}</p>
                <p className="col-span-2"><span className="font-medium">Address:</span> {selectedOrder.customerAddress}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Order Items</h4>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Item</th>
                    <th className="border p-2 text-right">Price</th>
                    <th className="border p-2 text-right">Quantity</th>
                    <th className="border p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border p-2">{item.name}</td>
                      <td className="border p-2 text-right">₹{item.price}</td>
                      <td className="border p-2 text-right">{item.quantity}</td>
                      <td className="border p-2 text-right">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-gray-50">
                    <td colSpan="3" className="border p-2 text-right">Total Amount:</td>
                    <td className="border p-2 text-right">₹{selectedOrder.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-right">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
