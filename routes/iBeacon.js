var express = require('express');
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
var iBeacon = require('./../models/iBeacon');
var express = require('express');
var router = express.Router();

module.exports = function(db)
{
  router.post('/', function(req, res){
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
        console.log('newiBeacon Inserted!');
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
    iBeacon.find(function(err, iBeacons){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read all iBeacons!');
        res.status(200).json(iBeacons);
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
        res.status(200).json(iBeacon);
      }
    });
  });

  return router;
}
