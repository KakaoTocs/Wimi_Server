var express = require('express');
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
var RPi = require('./../models/RPi');
var express = require('express');
var router = express.Router();

module.exports = function(db)
{
  router.post('/', function(req, res){
    var newRPi = new RPi();
    newRPi.id = req.body.id;
    newRPi.place = req.body.place;

    newRPi.save(function(err){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('newRPi Inserted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.delete('/', function(req, res){
    RPi.remove({id: req.body.id}, function(err, output){
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
    var operator = {id: req.body.id, place: req.body.place};
    var option = {upsert: true};

    db.collection('rpis').update(query, operator, option, function(err, upserted){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('RPi fixed!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.get('/', function(req, res){
    RPi.find(function(err, RPis){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read all RPi!');
        res.status(200).json(RPis);
      }
    });
  });

  router.get('/:id', function(req, res){
    RPi.findOne({id: req.params.id}, function(err, user){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read RPi!');
        res.status(200).json(user);
      }
    });
  });

  return router;
}
