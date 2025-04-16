import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    "/images/laundry1.jpg",
    "/images/laundry2.jpg",
    "/images/laundry3.jpg",
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Navbar */}
      
        

      {/* Hero Section with Image Slider */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-24 md:py-32 w-full max-w-7xl mx-auto mt-16 md:mt-20">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left px-4">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Best <span className="text-red-500">Wash & Iron service</span> at your doorstep
          </h1>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            Smart Dhopa is the first Online Laundry Platform in DIU with the latest technology in washing, dry
            cleaning, and laundry. Our services combine expertise and experience to provide you with clean
            laundry in the shortest possible turnaround time.
          </p>
          <button className="mt-6 bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all">
            View Services
          </button>
        </div>

        {/* Image Slider */}
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <Slider {...sliderSettings} className="w-72 md:w-96">
            {images.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-lg shadow-lg" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
