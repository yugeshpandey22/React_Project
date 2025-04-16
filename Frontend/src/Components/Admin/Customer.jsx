import React from "react";

const customers = [
  {
    id: 1,
    name: "Abul Ali",
    email: "abul@gmail.com",
    contact: "01742583698",
    room: "Boys Hall - 2. Room: 302",
    road: "Datta Hall Road",
    address: "Asuliya, Savar, Dhaka",
  },
  {
    id: 2,
    name: "Tanish Sharma",
    email: "tanish@tanish.com",
    contact: "7878787878",
    room: "Jk",
    road: "jo",
    address: "jk",
  },
  {
    id: 3,
    name: "Rahul Singh",
    email: "rahul@gmail.com",
    contact: "01783518058",
    room: "a-4",
    road: "khagan",
    address: "59/b",
  },
  {
    id: 4,
    name: "Himanshu Kumar",
    email: "Himanshu@gmail.com",
    contact: "3456344535",
    room: "fdgsf",
    road: "4365",
    address: "dsg",
  },
  {
    id: 5,
    name: "Shivam Kumar",
    email: "skumar12@gmail.com",
    contact: "fdgdfgdfgfg",
    room: "54764",
    road: "547",
    address: "7654",
  },
  {
    id: 6,
    name: "Mulindwa",
    email: "mulinpatrick@gmail.com",
    contact: "0755140292",
    room: "Bavado",
    road: "kasule rod",
    address: "Kyanja",
  },
  {
    id: 7,
    name: "Shashank Kumar",
    email: "shashank999@gmail.com",
    contact: "+918967960709",
    room: "dscsd",
    road: "csdc",
    address: "Extension Area Near Chavan Bai Hospital Bgk",
  },
  {
    id: 8,
    name: "Shreya",
    email: "shreya123@gmail.com",
    contact: "1234567890",
    room: "ff",
    road: "ff",
    address: "ff",
  },
];

const CustomerTable = () => {
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
              <th className="py-2 px-4 border">Contact</th>
              <th className="py-2 px-4 border">Room / Flat</th>
              <th className="py-2 px-4 border">Road</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id} className="text-center border-b">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{customer.name}</td>
                <td className="py-2 px-4 border">{customer.email}</td>
                <td className="py-2 px-4 border">{customer.contact}</td>
                <td className="py-2 px-4 border">{customer.room}</td>
                <td className="py-2 px-4 border">{customer.road}</td>
                <td className="py-2 px-4 border">{customer.address}</td>
                <td className="py-2 px-4 border">
                  <button className="bg-pink-500 text-white px-3 py-1 rounded">
                    Send Email
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
