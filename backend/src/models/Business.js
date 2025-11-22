const { t } = require('i18next');
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a business name'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Please add a business address'],
        trim: true
    },
    nipt: {
        type: String,
        required: [true, 'Please add a NIPT'],
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        trim: true
    },
    wifi: {
        type: String,
        required: false,
        trim: true
    },
    opening_hours: {
        type: String,
        required: false,
        trim: true
    },
    logo_url: {
        type: String,
        required: false,
        trim: true
    },
    euro_exchange_rate: {
        type: Number,
        required: [true, 'Please add the Euro exchange rate'],
        default: 100
    },
    more_settings: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Business', businessSchema);