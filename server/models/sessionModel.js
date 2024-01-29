const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    ssid: { type: Number, required: true },
  },
  { expireAfterSeconds: 900 }
);

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
