const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

router.get('/:category', async (req, res) => {
    try {
        const products = await Products.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/', async (req, res) => {
    const {
        name,
        price,
        category,
        entrance,
        currentlyAvailable
    } = req.body;

    if(category !== 'ngrohta' && category !== 'ftohta' && category !== 'kuzhina' && category !== 'promocionale'){
        return  res.status(400).json({ message: 'Invalid category value' });
    }

    try {
        const newProduct = new Products({
            name,
            price,
            category,
            entrance,
            currentlyAvailable
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;