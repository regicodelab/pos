const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');

router.post('/', async (req, res) => {
    const {
        table,
        total,
        products,
    } = req.body;

    try {
        const newOrder = new Orders({
            table,
            total,
            products
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;