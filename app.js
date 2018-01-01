var express = require('express');
var app = express();
var mongoose = require('mongoose');
var http = require('http');
var bodyParser = require('body-parser');

//mongoose.connect('mongodb://127.0.0.1:27017/DGSW_RPi', {useMongoClient: true});
mongoose.connect('mongodb://wimi-cmdb:yICfEpKgKRt3ksfqJuTOgQ6f9KXPsP8lE6XpFjTcvGD36Kbo4ymbJ7zPzp5AMupJcOnBirUWP4X4Tr0oLstb6A==@wimi-cmdb.documents.azure.com:10255/?ssl=true&replicaSet=globaldb', {useMongoClient: true});
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
app.use('/users', user);
var iBeacon = require('./routes/iBeacon.js')(db);
app.use('/iBeacons', iBeacon);
var RPi = require('./routes/RPi.js')(db);
app.use('/RPis', RPi);
var place = require('./routes/place.js')(db);
app.use('/places', place);
var building = require('./routes/building.js')(db);
app.use('/buildings', building);
var target = require('./routes/target.js')(db);
app.use('/targets', target);
var hub = require('./routes/hub.js')(db);
app.use('/hubs', hub);

app.get('/', function(req, res){
  res.status(200).json({code: 200, message: "이 페이지는 아무기능 없음\n서버 작동 확인을 위한 페이지"});
});

http.createServer(app).listen(process.env.PORT || 80);
/*
app.listen(80, function(){
  console.log('Server is running...');
});
*/
