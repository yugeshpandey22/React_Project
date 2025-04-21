// MongoDB Compass Connection Configuration
module.exports = {
    // Local MongoDB Connection
    uri: 'mongodb://localhost:27017/admin-dashboard',
    
    // Database Name
    dbName: 'admin-dashboard',
    
    // Collections
    collections: {
        orders: 'orders',
        customers: 'customers',
        admins: 'admins'
    },
    
    // Connection Options
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        family: 4 // Use IPv4, skip trying IPv6
    }
}; 


