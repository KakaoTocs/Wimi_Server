var mongoose = require('mongoose');

var hub = mongoose.Schema({
  deviceId: String,
  uuid: String,
  major: String,
  minor: String,
  rssi: String,
  cur: String
});

module.exports = mongoose.model('hubs', hub);
