const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { SESSION_LENGTH } = require('../../constants');

const sessionSchema = new Schema(
  {
    ssid: { type: Number, required: true },
  },
  { expireAfterSeconds: SESSION_LENGTH }
);

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
