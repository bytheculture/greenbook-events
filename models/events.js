const mongoose = require('mongoose');
const EventsSchema = new mongoose.Schema({
  eventName: String,
  category: String,
  description: String,
  eventbriteLink: String,
  pointOfContact: String,
  emailAddress: String,
  eventDate: String
});
module.exports = mongoose.model('Events', EventsSchema);
