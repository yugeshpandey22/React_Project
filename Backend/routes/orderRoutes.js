const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Create new order
router.post('/', [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('customerEmail').isEmail().withMessage('Valid email is required'),
    body('customerContact').notEmpty().withMessage('Customer contact is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('products').isNumeric().withMessage('Products count must be a number'),
    body('items').isArray().withMessage('Items must be an array')
], async (req, res) => {
    console.log("🟡 Incoming order payload:", req.body); // log input

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("🔴 Validation Errors:", errors.array()); // log validation issues
        return res.status(400).json({ errors: errors.array() });
    }

    const order = new Order({
        orderNumber: `ORD-${Date.now()}`,
        ...req.body
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log("🔴 Failed to save order:", error.message); // log DB errors
        res.status(400).json({ message: error.message });
    }
});

// Update order status
router.patch('/:id/status', [
    body('status').notEmpty().withMessage('Status is required')
], async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log(`🟡 Updating order ${id} status to: ${status}`);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const allowedStatuses = ["Order Placed", "Order Picked", "Order Completed"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ 
                message: `Invalid status value. Must be one of: ${allowedStatuses.join(', ')}` 
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error("🔴 Error updating order status:", error);
        res.status(500).json({ message: error.message });
    }
});

// Update order (for status updates)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log(`🟡 Updating order ${id} with:`, req.body);

        // If status is being updated, validate it
        if (status) {
            const allowedStatuses = ["Order Placed", "Order Picked", "Order Completed"];
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({ 
                    message: `Invalid status value. Must be one of: ${allowedStatuses.join(', ')}` 
                });
            }
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error("🔴 Error updating order:", error);
        res.status(500).json({ message: error.message });
    }
});

// Simple POST endpoint for updating order status
router.post('/update-status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log(`🟡 POST Update status for order ${id} to: ${status}`);

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const allowedStatuses = ["Order Placed", "Order Picked", "Order Completed"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ 
                message: `Invalid status value. Must be one of: ${allowedStatuses.join(', ')}` 
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error("🔴 Error updating order status:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

