// models/RegisterEvent.js

const mongoose = require('mongoose');

const registerEventSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  eventMode: {
    type: String,
    required: true,
  },
  eventLocation: {
    type: String,
  },
  meetingId: {
    type: String,
  },
});

module.exports = mongoose.model('RegisterEvent', registerEventSchema);
