var express = require('express');
var iBeacon = require('./../models/iBeacon');
var router = express.Router();

module.exports = function(db)
{
  router.post('/', function(req, res){
    console.log(req.body)
    var newiBeacon = new iBeacon();
    newiBeacon.id = req.body.id;
    newiBeacon.uuid = req.body.uuid;
    newiBeacon.maj = req.body.maj;
    newiBeacon.min = req.body.min;

    newiBeacon.save(function(err){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('new iBeacon Inserted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.delete('/', function(req, res){
    iBeacon.remove({id: req.body.id}, function(err, output){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('RPi deleted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.put('/', function(req, res){
    var query = {id: req.body.id};
    var operator = {id: req.body.id, uuid: req.body.uuid, maj: req.body.maj, min: req.body.min};
    var option = {upsert: true};

    db.collection('ibeacons').update(query, operator, option, function(err, upserted){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('iBeacon fixed!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.get('/', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    iBeacon.find(function(err, iBeacons){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read all iBeacons!');
        var result = {
          iBeacons: iBeacons
        };
        res.status(200).json(result);
      }
    });
  });

  router.get('/:id', function(req, res){
    iBeacon.findOne({id: req.params.id}, function(err, iBeacon){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read iBeacon!');
        var result = {
          iBeacon: iBeacon
        };
        res.status(200).json(iBeacon);
      }
    });
  });

  return router;
}
