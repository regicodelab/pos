const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');


router.post('/', async (req, res)=>{
    const {
        waiterId,
        startDateTime,
        endDateTime
    } = req.body;

    const query = {
        createdAt: {
            $gte: new Date(startDateTime),
            $lte: new Date(endDateTime),
        },
        waiterId: waiterId ? waiterId : { $exists: true },
    }

    const db_orders = await Orders.find(query);

    const total_products_sold = db_orders.map(order => 
        order.products.reduce((sum, item) => sum + item.quantity, 0)
    ).reduce((a, b) => a + b, 0);
    
    const product_sales = {};

    for (let order of db_orders) {
        for (let item of order.products) {
            if (!product_sales[item.productId]) {
                product_sales[item.productId] = {
                    name: item.name,
                    quantity: 0,
                    totalAmount: 0
                };
            }
            product_sales[item.productId].quantity += item.quantity;
            product_sales[item.productId].totalAmount += item.quantity * item.price;
        }
    }

    let total_amount = 0;
    
    for (let order of db_orders) {
        total_amount += order.total;
    }

    res.json({
        orders: db_orders,
        total_products_sold,
        product_sales,
        total_amount
    });

});


module.exports = router;
