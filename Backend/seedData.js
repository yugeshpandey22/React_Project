const mongoose = require('mongoose');
const Order = require('./models/Order');
const Customer = require('./models/Customer');
const Admin = require('./models/Admin');
require('dotenv').config();

// Sample data for Customers
const customers = [
    {
        name: "John Doe",
        email: "john@example.com",
        contact: "1234567890",
        room: "101",
        road: "Main Street",
        address: "New York, NY 10001"
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        contact: "0987654321",
        room: "202",
        road: "Park Avenue",
        address: "New York, NY 10002"
    },
    {
        name: "Mike Johnson",
        email: "mike@example.com",
        contact: "5555555555",
        room: "303",
        road: "Broadway",
        address: "New York, NY 10003"
    }
];

// Sample data for Orders
const orders = [
    {
        orderNumber: "ORD-001",
        status: "Order Completed",
        amount: 1500,
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerContact: "1234567890",
        products: 3,
        items: [
            { name: "Product A", quantity: 1, price: 500 },
            { name: "Product B", quantity: 2, price: 1000 }
        ],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
    },
    {
        orderNumber: "ORD-002",
        status: "Order Placed",
        amount: 2000,
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        customerContact: "0987654321",
        products: 2,
        items: [
            { name: "Product C", quantity: 1, price: 2000 }
        ],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
        orderNumber: "ORD-003",
        status: "Order Picked",
        amount: 3000,
        customerName: "Mike Johnson",
        customerEmail: "mike@example.com",
        customerContact: "5555555555",
        products: 4,
        items: [
            { name: "Product D", quantity: 2, price: 1500 },
            { name: "Product E", quantity: 2, price: 1500 }
        ],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    }
];

// Sample data for Admins
const admins = [
    {
        name: "Super Admin",
        email: "superadmin@example.com",
        password: "superadmin123",
        role: "superadmin"
    },
    {
        name: "Regular Admin",
        email: "admin@example.com",
        password: "admin123",
        role: "admin"
    }
];

// Function to seed the database
async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Order.deleteMany({});
        await Customer.deleteMany({});
        await Admin.deleteMany({});
        console.log('Cleared existing data');

        // Insert new data
        await Customer.insertMany(customers);
        console.log('Added customers');

        await Order.insertMany(orders);
        console.log('Added orders');

        // Create admins (passwords will be hashed automatically by the model)
        for (const admin of admins) {
            await new Admin(admin).save();
        }
        console.log('Added admins');

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeding function
seedDatabase(); 