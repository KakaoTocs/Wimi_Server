var express = require('express');
var place = require('./../models/place');
var building = require('./../models/building');
var router = express.Router();

module.exports = function(db)
{
  router.post('/', function(req, res){
    var newPlace = new place();
    newPlace.bId = req.body.bId;
    newPlace.pId = req.body.pId;
    newPlace.floor = req.body.floor;
    newPlace.pname = req.body.pname;

    newPlace.save(function(err){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('new place Inserted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.delete('/', function(req, res){
    place.remove({pId: req.body.pId}, function(err, output){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('place deleted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.put('/', function(req, res){
    var query = {pId: req.body.pId};
    var operator = {pId: req.body.pId, bId: req.body.bId, floor: req.body.floor, pname: req.body.pname};
    var option = {upsert: true};

    db.collection('places').update(query, operator, option, function(err, upserted){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('place fixed!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.get('/', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    place.find(function(err, places){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read all places!');
        var result = {
          Places: places
        };
        res.status(200).json(result);
      }
    });
  });

  router.get('/:pId', function(req, res){
    place.findOne({pId: req.params.pId}, function(err, place){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read place!');
        var result = {
          Place: place
        };
        res.status(200).json(result);
      }
    });
  });

  return router;
}
