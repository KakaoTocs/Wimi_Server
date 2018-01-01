var mongoose = require('mongoose');

var target = mongoose.Schema({
  classNum: Number,
  name: String,
  proFilePic: String,
  location:{
    pId: String,
    bId: Number,
    floor: Number,
    pname: String,
    bname: String,
    rssi: String,
    cur: String
  }
});

module.exports = mongoose.model('targets', target);
