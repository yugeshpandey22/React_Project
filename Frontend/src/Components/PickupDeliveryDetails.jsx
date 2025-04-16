import React, { useState } from "react";

const PickupDeliveryDetails = ({ onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSave = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      onSave();
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      {successMessage && (
        <div className="bg-green-500 text-white px-4 py-2 rounded-md mb-4">
          ✅ Order is successfully placed!
        </div>
      )}
      <h2 className="text-center text-2xl font-bold text-red-600">Edit Pickup & Delivery Details</h2>
      <p className="text-center text-gray-600 mb-4">Export will arrive at your given address within 30 minutes</p>

      <label className="block font-semibold">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Your Name"
      />
      
      <label className="block font-semibold">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Your Email"
      />

      <label className="block font-semibold">Number</label>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Your Number"
      />

      <label className="block font-semibold">Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Your Address"
      />

      <button
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        onClick={handleSave}
      >
        Save as Continue
      </button>
    </div>
  );
};

export default PickupDeliveryDetails;
