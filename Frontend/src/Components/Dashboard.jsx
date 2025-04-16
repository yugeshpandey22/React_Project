import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Hero Section */}
      <div className="bg-red-500 text-white p-6 rounded-lg text-center">
        <h1 className="text-xl font-bold">Best Wash & Iron Service</h1>
        <p className="mt-2">Laundry web application is the first online laundry platform...</p>
        <button 
          className="bg-white text-red-500 px-4 py-2 mt-4 rounded"
          onClick={() => navigate('/services')}
        >
          VIEW SERVICES
        </button>
      </div>

      {/* About Us */}
      <section className="mt-8 text-center">
        <h2 className="text-2xl font-semibold">About Us</h2>
        <p className="mt-2 text-gray-600">At our Laundry, we redefine laundry services by providing a seamless, professional, and high-quality cleaning experience. As the first online laundry platform, we bring convenience to your doorstep with premium washing, ironing, dry cleaning, and express services.
Our mission is to save you time and effort by offering hassle-free laundry solutions with free pickup and delivery. Using eco-friendly detergents and advanced cleaning techniques, we ensure that your clothes are not only spotless but also well cared for.
With transparent pricing, excellent customer support, and a commitment to quality, It is your go-to partner for all your laundry needs. Whether it's everyday wear, delicate fabrics, or emergency cleaning, we guarantee fresh, clean, and neatly pressed clothes—every time!</p>
      </section>

      {/* Services Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-center">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {[
            { title: "Wash & Iron", desc: "All your regular wear garments..." },
            { title: "Wash & Fold", desc: "Just in case you choose..." },
            { title: "Iron & Fold", desc: "Get back your dry clothes..." },
            { title: "Dry Cleaning", desc: "All your sensitive and premium clothes..." },
            { title: "Emergency Service", desc: "You can use our emergency services..." },
            { title: "Subscription Based", desc: "You get best Price, Quality Service..." }
          ].map((service, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.desc}</p>
              <button 
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded" 
                onClick={() => navigate('/services')}
              >
                Select Service
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mt-8 text-center">
        <h2 className="text-2xl font-semibold">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {[
            "Free Pickup & Delivery",
            "Indian Rupee - No Hidden Cost",
            "Eco Friendly",
            "Quality Checks",
            "Transparent Pricing"
          ].map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
