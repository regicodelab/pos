const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true
  },
  last_name: {
    type: String,
    required: [true, 'Please add a last name'],
    trim: true
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    unique: true,
    trim: true
  },
  role:{
    type: String,
    enum: ['waiter', 'hall_leader', 'admin', 'accountant'],
    default: 'waiter',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);