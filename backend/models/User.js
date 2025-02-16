// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  description: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: [String], required: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
