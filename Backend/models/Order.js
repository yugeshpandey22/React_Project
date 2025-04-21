const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: String,
  status: String,
  amount: Number,
  customerName: String,
  customerEmail: String,
  customerContact: String,
  customerAddress: String, // ← Ensure this is here
  serviceDate: String,     // ← Ensure this is here
  products: Number,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
