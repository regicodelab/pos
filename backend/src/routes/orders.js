const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');
const Products = require('../models/Products');
const User = require('../models/User');

router.post('/', async (req, res) => {
    const {
        table,
        total,
        products,
        waiterPin
    } = req.body;

    try {
        const currentWaiter = await User.findOne({
            password: waiterPin
        });

        if (!currentWaiter) {
            return res.status(401).json({ message: 'Invalid waiter PIN' });
        }

        const newOrder = new Orders({
            table,
            total,
            products,
            waiterId: currentWaiter._id,
            waiterName: `${currentWaiter.first_name} ${currentWaiter.last_name}`
        });
        const savedOrder = await newOrder.save();

        for(let product of products) {
            const product_from_db = await Products.findById(product.productId);
            product_from_db.currentlyAvailable -= product.quantity;
            await product_from_db.save();
        }

        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;