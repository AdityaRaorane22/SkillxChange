const mongoose = require('mongoose');

const offerSkillSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
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
    enum: ['online', 'offline'],
    required: true,
  },
  address: {
    type: String,
    trim: true,
  },
  meetingId: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

const OfferSkill = mongoose.model('OfferSkill', offerSkillSchema);

module.exports = OfferSkill;
