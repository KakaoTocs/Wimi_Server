var mongoose = require('mongoose');

var user = mongoose.Schema({
  classNum: Number,
  bId: Number,
  name: String
});

module.exports = mongoose.model('users', user);
