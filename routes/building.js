var express = require('express');
var build = require('./../models/building');
var router = express.Router();

module.exports = function(db)
{
  router.post('/', function(req, res){
    var newBuild = new build();
    newBuild.bId = req.body.bId;
    newBuild.bname = req.body.bname;
    newBuild.floor = req.body.floor;

    newBuild.save(function(err){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('new build Inserted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.delete('/', function(req, res){
    build.remove({bId: req.body.bId}, function(err, output){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('build deleted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.put('/', function(req, res){
    var query = {bId: req.body.bId};
    var operator = {bId: req.body.bId, bname: req.body.bname, floor: req.body.floor};
    var option = {upsert: true};

    db.collection('builds').update(query, operator, option, function(err, upserted){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('build fixed!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.get('/', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    build.find(function(err, builds){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read all builds!');
        var result = {
          buildings: builds
        };
        res.status(200).json(result);
      }
    });
  });

  router.get('/:bId', function(req, res){
    build.findOne({bId: req.params.bId}, function(err, build){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read build!');
        var result = {
          building: build
        };
        res.status(200).json(result);
      }
    });
  });

  return router;
}
