const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    table: {
        type: Number,
        required: true,
        unique: false
    },
    total:{
        type: Number,
        required: true,
        unique: false
    },
    products:{
        type: Array,
        required: true,
        unique: false
    },
    waiterId:{
        type: String,
        required: true,
        unique: false
    },
    waiterName:{
        type: String,
        required: true,
        unique: false
    }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', ordersSchema);