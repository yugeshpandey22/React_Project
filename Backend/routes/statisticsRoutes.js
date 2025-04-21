const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const moment = require('moment');

// Get business report statistics
router.get('/business-report', async (req, res) => {
    try {
        const today = moment().startOf('day');
        const lastMonth = moment().subtract(1, 'month').startOf('day');

        // Calculate completion rate
        const totalOrders = await Order.countDocuments({
            createdAt: { $gte: lastMonth.toDate() }
        });
        const completedOrders = await Order.countDocuments({
            status: 'Order Completed',
            createdAt: { $gte: lastMonth.toDate() }
        });

        const completionRate = totalOrders > 0 
            ? Math.round((completedOrders / totalOrders) * 100) 
            : 0;

        // Calculate daily revenue
        const dailyRevenue = await Order.aggregate([
            {
                $match: {
                    status: 'Order Completed',
                    createdAt: { $gte: today.toDate() }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        // Calculate monthly growth
        const currentMonthRevenue = await Order.aggregate([
            {
                $match: {
                    status: 'Order Completed',
                    createdAt: { $gte: moment().startOf('month').toDate() }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        const lastMonthRevenue = await Order.aggregate([
            {
                $match: {
                    status: 'Order Completed',
                    createdAt: {
                        $gte: moment().subtract(1, 'month').startOf('month').toDate(),
                        $lt: moment().startOf('month').toDate()
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        const monthlyGrowth = lastMonthRevenue[0]?.total 
            ? ((currentMonthRevenue[0]?.total || 0) - lastMonthRevenue[0].total) / lastMonthRevenue[0].total * 100
            : 0;

        res.json({
            completionRate,
            dailyRevenue: dailyRevenue[0]?.total || 0,
            monthlyGrowth: Math.round(monthlyGrowth * 100) / 100
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
    try {
        // Get order summary
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: 'Order Placed' });
        const completedOrders = await Order.countDocuments({ status: 'Order Completed' });
        const totalEarnings = await Order.aggregate([
            { $match: { status: 'Order Completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Get weekly orders data
        const lastWeek = moment().subtract(7, 'days').startOf('day');
        const orders = await Order.find({
            createdAt: { $gte: lastWeek.toDate() }
        });

        // Initialize data structure for each day of the week
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weeklyData = daysOfWeek.map(day => ({
            day,
            Order_Placed: 0,
            Order_Completed: 0
        }));

        // Count orders by day and status
        orders.forEach(order => {
            const dayIndex = moment(order.createdAt).day();
            if (order.status === 'Order Placed' || order.status === 'Order Picked') {
                weeklyData[dayIndex].Order_Placed++;
            } else if (order.status === 'Order Completed') {
                weeklyData[dayIndex].Order_Completed++;
            }
        });

        // Get business report data
        const lastMonth = moment().subtract(1, 'month').startOf('day');
        const monthlyTotalOrders = await Order.countDocuments({
            createdAt: { $gte: lastMonth.toDate() }
        });
        const monthlyCompletedOrders = await Order.countDocuments({
            status: 'Order Completed',
            createdAt: { $gte: lastMonth.toDate() }
        });

        const completionRate = monthlyTotalOrders > 0 
            ? Math.round((monthlyCompletedOrders / monthlyTotalOrders) * 100) 
            : 0;

        res.json({
            summary: {
                totalOrders,
                pendingOrders,
                completedOrders,
                totalEarnings: totalEarnings[0]?.total || 0
            },
            weeklyData,
            businessReport: {
                completionRate
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 