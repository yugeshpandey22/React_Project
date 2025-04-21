import React, { useState } from "react";
import axios from "axios";


const services = [
  {
    title: "Wash & Iron",
    description:
      "All your regular wear garments will be washed, steam ironed and neatly packed for delivery.",
    image: "https://www.callyourdhobi.com/assets/Images/Services/Laundry/6.webp",
  },
  {
    title: "Wash & Fold",
    description:
      "Just in case you choose not to use our steam ironing services we will wash and fold them for you.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIE60pO4pSHq4hxU3aI4YUK1pcZZRC-EogcQ&s",
  },
  {
    title: "Dry Cleaning",
    description:
      "All your sensitive and special garments will be individually treated for any stains and dry cleaned.",
    image: "https://img.freepik.com/free-photo/woman-pouring-detergent-cap_23-2148386967.jpg?t=st=1695305385~exp=1695305985~hmac=143a31cd3f6c5d7cfc6f9fce158652371dd32708c9a50cbe911c80953233c3b4",
  },
  {
    title: "Emergency Service",
    description:
      "You can use our emergency service to receive services easily and quickly in our machines using very safe.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYewAcBf3fYa8sn8ow2AUaoB-jHYHTo5FM9Q&s",
  },
];

const categories = {
  men: [
    { name: "Exclusive Punjabi", price: 120 },
    { name: "Top Wear (Shirt / T-shirt / Fatua)", price: 10 },
    { name: "Sherwani", price: 350 },
  ],
  women: [
    { name: "Saree", price: 150 },
    { name: "Lehenga", price: 500 },
    { name: "Western Dress", price: 200 },
  ],
  household: [
    { name: "Bedsheets", price: 50 },
    { name: "Curtains", price: 80 },
    { name: "Towels", price: 30 },
  ],
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    date: "",
  });

  const toggleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const updateQuantity = (itemName, change) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[itemName] || 0) + change;
      if (newQuantity < 0) return prevCart;
      return { ...prevCart, [itemName]: newQuantity };
    });
  };

  const handleCheckout = async () => {
    const { name, email, contact, address, date } = formData;
  
    if (!name || !email || !contact || !address || !date) {
      alert("Please fill in all the fields before checking out.");
      return;
    }

    // Check if cart is empty
    if (Object.keys(cart).length === 0 || Object.values(cart).every(qty => qty === 0)) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }
    
    // Create cart items array
    const cartItems = Object.entries(cart)
      .filter(([, quantity]) => quantity > 0)
      .map(([itemName, quantity]) => ({
        name: itemName,
        quantity: Number(quantity),
        price: Number(getItemPrice(itemName))
      }));
    
    // Calculate total amount and product count
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const productCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    try {
      console.log("Sending order data:", {
        customerName: name,
        customerEmail: email,
        customerContact: contact,
        customerAddress: address,
        serviceDate: date,
        items: cartItems,
        amount: Number(totalAmount),
        products: Number(productCount)
      });
      
      const response = await axios.post("http://localhost:5001/api/orders", {
        customerName: name,
        customerEmail: email,
        customerContact: contact,
        customerAddress: address,
        serviceDate: date,
        items: cartItems,
        amount: Number(totalAmount),
        products: Number(productCount),
      });
      
      console.log("Order success:", response.data);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        setCart({});
        setFormData({ name: "", email: "", contact: "", address: "", date: "" });
        setShowCart(false);
      }, 2000);
    } catch (error) {
      console.error("Order failed:", error);
      console.error("Error details:", error.response?.data);
      
      if (error.response && error.response.data && error.response.data.errors) {
        // Show specific validation errors
        const errorMessages = error.response.data.errors.map(err => err.msg).join('\n');
        alert(`Order failed: ${errorMessages}`);
      } else if (error.response && error.response.data && error.response.data.message) {
        alert(`Order failed: ${error.response.data.message}`);
      } else {
        alert("Something went wrong while placing the order.");
      }
    }
  };
  
  // Helper function to get item price based on name
  const getItemPrice = (itemName) => {
    for (const category in categories) {
      const item = categories[category].find(item => item.name === itemName);
      if (item) return item.price;
    }
    return 0;
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          ✅ Order placed successfully!
        </div>
      )}

      {showCart ? (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-center text-2xl font-bold text-red-600">Your Bag</h2>
          <p className="text-center text-gray-600">Total Items: {Object.values(cart).reduce((a, b) => a + b, 0)}</p>
          <hr className="my-4" />

          {Object.entries(cart).map(([item, qty]) => (
            qty > 0 && (
              <div key={item} className="flex justify-between items-center border-b py-2">
                <span>{item}</span>
                <div className="flex items-center">
                  <button className="bg-gray-400 text-white px-2 py-1" onClick={() => updateQuantity(item, -1)}>-</button>
                  <span className="px-4">{qty}</span>
                  <button className="bg-gray-400 text-white px-2 py-1" onClick={() => updateQuantity(item, 1)}>+</button>
                </div>
              </div>
            )
          ))}

          {/* Customer Details Form */}
          <div className="my-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="9876543210"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
              <textarea
                rows="3"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Your complete address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Service Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <hr className="my-4" />
          <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition" onClick={handleCheckout}>
            Checkout Your Order
          </button>

          <button className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-700 transition" onClick={() => setShowCart(false)}>
            Back
          </button>
        </div>
      ) : selectedService === null ? (
        <>
          <h2 className="text-center text-2xl font-semibold mb-6 border-b-2 inline-block">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 text-center"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-bold text-red-600 mt-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{service.description}</p>
                <button
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                  onClick={() => setSelectedService(service.title)}
                >
                  Select Service
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            onClick={() => setSelectedService(null)}
          >
            ⬅ Back to Services
          </button>

          <h2 className="text-center text-2xl font-bold text-red-600 mb-6">
            {selectedService} Service
          </h2>

          <div className="max-w-lg mx-auto space-y-4">
            {Object.keys(categories).map((category) => (
              <div key={category} className="bg-white shadow-lg rounded-lg">
                <div
                  className="flex items-center p-4 cursor-pointer border-b"
                  onClick={() => toggleDropdown(category)}
                >
                  <span className="flex-1 text-lg font-semibold capitalize">{category}’s</span>
                  <span className="text-xl">{openDropdown === category ? "▲" : "▼"}</span>
                </div>
                {openDropdown === category && (
                  <div className="p-4 bg-gray-100 space-y-2">
                    {categories[category].map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-600">₹ {item.price} / piece</p>
                        </div>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                          onClick={() => {
                            updateQuantity(item.name, 1);
                            setShowCart(true);
                          }}
                        >
                          add to bag
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Services;
