const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    }
}, {
  timestamps: true
});

module.exports = mongoose.model('Table', tableSchema);