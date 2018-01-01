var express = require('express');
var hub = require('./../models/hub');
var router = express.Router();

module.exports = function(db)
{
  router.post('/', function(req, res){
    var newHub = new hub();
    newHub.deviceId = req.body.deviceId;
    newHub.uuid = req.body.uuid;
    newHub.major = req.body.major;
    newHub.minor = req.body.minor;
    newHub.rssi = req.body.rssi;
    newHub.cur = new Date(req.body.cur);

    newHub.save(function(err){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('new hub Inserted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.delete('/', function(req, res){
    hub.remove({deviceId: req.body.deviceId}, function(err, output){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('hub deleted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });
/*
  router.put('/', function(req, res){
    var Key = ""
    var PId = ""
    var Com = ""
    RPi.findOne({Id: req.body.Id}, function(err, RPis){
      if(err){
        res.status(400).json({code: 400, message: "fail", err: err.message});
      }else{
        if(req.body.key) RPis.key = req.body.key
        if(req.body.pId) RPis.pId = req.body.pId
        if(req.body.com) RPis.com = req.body.com
        RPis.save(function(err){
          if(err){
            res.status(400).json({code: 400, message: "fail", err: err.message});
          }else{
            res.status(200).json({code: 200, message: "succese"});
          }
        })
      }
    })
  });
*/
  router.get('/', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    hub.find(function(err, Hubs){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read all RPi!');
        var result = {
          hubs: Hubs
        };
        res.status(200).json(result);
      }
    });
  });
/*
  router.get('/:deviceId', function(req, res){
    hub.findOne({deviceId: req.params.deviceId}, function(err, user){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read RPi!');
        var result = {
          hubs: hub
        };
        res.status(200).json(result);
      }
    });
  });
*/
  return router;
}
