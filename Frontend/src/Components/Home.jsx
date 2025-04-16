import "react";

const Home = () => {
  return (
    <div className="bg-gray-100 font-sans">
      {/* Header Section */}
      {/* <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-red-600">Smart Dhopa</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded">Book Now</button>
      </header> */}
      
      {/* Hero Section */}
      <section className="text-center py-10 px-4">
        <h2 className="text-2xl font-bold">Best Wash & Iron Service</h2>
        <p className="text-gray-600 my-2">In your doorstep</p>
        <p className="max-w-lg mx-auto text-gray-700">
          Laundry web application is the first online laundry platform in DU with the latest technology in washing, dry-cleaning, and ironing.
        </p>
        <button className="bg-red-600 text-white px-6 py-2 mt-4 rounded">View Services</button>
      </section>
      
      {/* Services Section */}
      <section className="py-10 px-6">
        <h2 className="text-xl font-bold text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { title: "Wash & Iron", desc: "Your clothes will be washed, ironed, and neatly packed.", img: "https://thedetailinggang.com/inside/images/services/car-dry-cleaning.webp" },
            { title: "Wash & Fold", desc: "Steam washing and folding for your clothes.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV3uT_mgXE6ME_1K6ocmam-LcT1yT4qCTTIUszi40p9x8x8JtLOS5l6QGAmyIU3f4mlpU&usqp=CAU" },
            { title: "Iron & Fold", desc: "Get back your clothes wrinkle-free.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTweZ6YaiFh4UTtsx81mjy-eaUHCsEpefPFNh2yEjkom2irbH-6oBwuNu28gjea6Ry0w38&usqp=CAU" },
          ].map((service, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-md text-center">
              <img src={service.img} alt={service.title} className="w-full h-40 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-semibold my-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
              <button className="bg-red-600 text-white px-4 py-2 mt-4 rounded">Select Service</button>
            </div>
          ))}
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-10 px-6 bg-gray-200">
        <h2 className="text-xl font-bold text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { title: "Free Pickup & Delivery", desc: "Doorstep pickup and delivery at your convenience.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDTCyyA4iYEew5-gCISykKDXMvM6FzQppuP_ixzntSfH-8zIT7UPsb7VPjm35SV_CkaIg&usqp=CAU" },
            { title: "Hygienic", desc: "Your clothes are hygienically cleaned.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHFHGEx9yV7C6qXUKm25SQRFDOdOTc4LsmguEHOV3e2HcYPhHbtjCX4kXBNRUmzzb21J4&usqp=CAU" },
            { title: "Affordable", desc: "Get laundry at the best price.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpKI9LESA7LLnGLPbMG5SWWHTBLZBYGAjP3qfBMtq5sEiF2-Jc8_GGxbNKzYG2jUVSL0&usqp=CAU" },
          ].map((benefit, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-md text-center">
              <img src={benefit.img} alt={benefit.title} className="w-full h-32 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-semibold my-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
