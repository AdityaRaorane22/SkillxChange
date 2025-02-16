const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  skillId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Skill' }, // Reference to skill
  skillName: { type: String, required: true },
  meetingId: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  mode: { type: String, required: true },
  address: { type: String },
  description: { type: String },
  credits: { type: Number, required: true },
});

module.exports = mongoose.model('Registration', registrationSchema);
