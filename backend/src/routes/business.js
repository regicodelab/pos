const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

// router.post('/', async (req, res) => {
//     const {
//         name,
//         address,
//         nipt,
//         phone,
//         wifi,
//         opening_hours,
//         logo_url,
//         euro_exchange_rate
//     } = req.body;
//     try {
//         const newBusiness = new Business({
//             name,
//             address,
//             nipt,
//             phone,
//             wifi,
//             opening_hours,
//             logo_url,
//             euro_exchange_rate
//         });
//         const savedBusiness = await newBusiness.save();
//         res.status(201).json(savedBusiness);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

router.get('/:id', async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedBusiness = await Business.findByIdAndUpdate(
            req.params.id,
            req.body,
        );
        if (!updatedBusiness) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(200).json({ message: 'Business updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;