const express = require('express');
const router = express.Router();
const Table = require('../models/Tables');

router.get('/', async (req, res) => {
    try {
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/', async (req, res) => {
    const { number } = req.body;
    try {
        const newTable = new Table({ number });
        const savedTable = await newTable.save();
        res.status(201).json(savedTable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


