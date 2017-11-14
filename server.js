var express = require('express');
var app = express();
var mongoose = require('mongoose');
var multiparty = require('multiparty');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/DGSW_RPi', {useMongoClient: true});
var db = mongoose.connection;

db.on('error', function(){
  console.log('DB Connection Failed!');
});
db.once('open', function(){
  console.log('DB Connected!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var user = require('./routes/user.js')(db);
app.use('/user', user);
var RPi = require('./routes/RPi.js')(db);
app.use('/RPi', RPi);
var iBeacon = require('./routes/iBeacon.js')(db);
app.use('/iBeacon', iBeacon);

app.listen(80, function(){
  console.log('Server is running...');
});
