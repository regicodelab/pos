const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    category:{
        type: String,
        enum: ['ngrohta', 'ftohta', 'kuzhina', 'promocionale'],
        required: true,
        trim: true
    },
    entrance: {
        type: Number,
        required: true,
        default: 0
    },
    currentlyAvailable: {
        type: Number,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);