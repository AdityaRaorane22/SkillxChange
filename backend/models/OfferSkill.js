const mongoose = require('mongoose');

const offerSkill = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    enum: ['online', 'offline'],
  },
  address: {
    type: String,
  },
  meetingId: {
    type: String,
  },
  password: {
    type: String,
  },
  credits: { type: Number, default: 100 },
});

const OfferSkill = mongoose.model('OfferSkill', offerSkill);

module.exports = OfferSkill;
