const mongoose = require('mongoose');
const compassConfig = require('./compass');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(compassConfig.uri, compassConfig.options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Handle MongoDB connection errors
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        // Handle application termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.log('Make sure MongoDB is running locally on port 27017');
        console.log('To start MongoDB:');
        console.log('1. Open Command Prompt as Administrator');
        console.log('2. Run: net start MongoDB');
        process.exit(1);
    }
};

module.exports = connectDB; 