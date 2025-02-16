const mongoose = require('mongoose');

const communityEventSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  description: {
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
  mode: {
    type: String,
    enum: ['online', 'offline'],
    required: true,
  },
  location: {
    type: String,
    required: function () { return this.mode === 'offline'; },
  },
  meetingId: {
    type: String,
    required: function () { return this.mode === 'online'; },
  },
  password: {
    type: String,
    required: function () { return this.mode === 'online'; },
  },
});

const CommunityEvent = mongoose.model('CommunityEvent', communityEventSchema);

module.exports = CommunityEvent;
