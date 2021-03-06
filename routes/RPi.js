var express = require('express');
var RPi = require('./../models/RPi');
var place = require('./../models/place');
var router = express.Router();

module.exports = function(db)
{
  router.post('/', function(req, res){
    var newRPi = new RPi();
    newRPi.pId = req.body.pId
    newRPi.Id = req.body.Id;
    newRPi.key = req.body.key;
    newRPi.com = req.body.com;

    newRPi.save(function(err){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('new RPi Inserted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.delete('/', function(req, res){
    RPi.remove({Id: req.body.Id}, function(err, output){
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

  router.get('/', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    RPi.find(function(err, RPis){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read all RPi!');
        var result = {
          RPIs: RPis
        };
        res.status(200).json(result);
      }
    });
  });

  router.get('/:Id', function(req, res){
    RPi.findOne({Id: req.params.Id}, function(err, user){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read RPi!');
        var result = {
          RPI: RPi
        };
        res.status(200).json(result);
      }
    });
  });

  return router;
}
