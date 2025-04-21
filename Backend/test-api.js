const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

// Test data
const testAdmin = {
    email: 'admin@example.com',
    password: 'admin123'
};

const testCustomer = {
    name: 'Test Customer',
    email: 'test@example.com',
    contact: '1234567890',
    room: '101',
    road: 'Test Road',
    address: 'Test Address'
};

const testOrder = {
    orderNumber: `ORD-${Date.now()}`,
    status: 'Order Placed',
    amount: 1000,
    customerName: 'Test Customer',
    customerEmail: 'test@example.com',
    customerContact: '1234567890',
    products: 2,
    items: [
        { name: 'Test Product', quantity: 1, price: 500 }
    ]
};

async function runTests() {
    try {
        console.log('Starting API Tests...\n');

        // 1. Test Admin Authentication
        console.log('1. Testing Admin Authentication...');
        try {
            const loginResponse = await axios.post(`${API_URL}/admin/login`, testAdmin);
            console.log('✅ Admin login successful');
            const token = loginResponse.data.token;
            
            // Test admin profile
            const profileResponse = await axios.get(`${API_URL}/admin/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Admin profile retrieved');
        } catch (error) {
            console.log('❌ Admin authentication failed:', error.message);
        }

        // 2. Test Customer Operations
        console.log('\n2. Testing Customer Operations...');
        try {
            // Create customer
            const createCustomerResponse = await axios.post(`${API_URL}/customers`, testCustomer);
            console.log('✅ Customer created');
            const customerId = createCustomerResponse.data._id;

            // Get all customers
            const getCustomersResponse = await axios.get(`${API_URL}/customers`);
            console.log('✅ Customers retrieved');

            // Get single customer
            const getCustomerResponse = await axios.get(`${API_URL}/customers/${customerId}`);
            console.log('✅ Single customer retrieved');
        } catch (error) {
            console.log('❌ Customer operations failed:', error.message);
        }

        // 3. Test Order Operations
        console.log('\n3. Testing Order Operations...');
        try {
            // Create order
            const createOrderResponse = await axios.post(`${API_URL}/orders`, testOrder);
            console.log('✅ Order created');
            const orderId = createOrderResponse.data._id;

            // Get all orders
            const getOrdersResponse = await axios.get(`${API_URL}/orders`);
            console.log('✅ Orders retrieved');

            // Get single order
            const getOrderResponse = await axios.get(`${API_URL}/orders/${orderId}`);
            console.log('✅ Single order retrieved');

            // Update order status
            const updateOrderResponse = await axios.patch(`${API_URL}/orders/${orderId}`, {
                status: 'Order Picked'
            });
            console.log('✅ Order status updated');
        } catch (error) {
            console.log('❌ Order operations failed:', error.message);
        }

        // 4. Test Statistics
        console.log('\n4. Testing Statistics...');
        try {
            // Get dashboard statistics
            const dashboardStatsResponse = await axios.get(`${API_URL}/statistics/dashboard`);
            console.log('✅ Dashboard statistics retrieved');

            // Get business report
            const businessReportResponse = await axios.get(`${API_URL}/statistics/business-report`);
            console.log('✅ Business report retrieved');
        } catch (error) {
            console.log('❌ Statistics operations failed:', error.message);
        }

        console.log('\nAll tests completed!');

    } catch (error) {
        console.error('Test suite failed:', error.message);
    }
}

// Run the tests
runTests(); 