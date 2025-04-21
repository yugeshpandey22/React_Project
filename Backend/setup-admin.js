require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/admin-dashboard';

async function setupAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Create new admin
        const admin = new Admin({
            email: 'admin@example.com',
            password: 'admin123',  // This will be hashed by the model's pre-save middleware
            name: 'Admin User',
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

setupAdmin(); 