const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample customers data (you can replace this with a database later)
let customers = [
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
  // ... other customer data
];

// Routes
app.get('/api/customers', (req, res) => {
  res.json(customers);
});

// Delete customer endpoint
app.delete('/api/customers/:id', (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    console.log('Attempting to delete customer with ID:', customerId);
    
    const initialLength = customers.length;
    customers = customers.filter(customer => customer.id !== customerId);
    
    if (customers.length === initialLength) {
      console.log('No customer found with ID:', customerId);
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    console.log('Customer deleted successfully');
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 