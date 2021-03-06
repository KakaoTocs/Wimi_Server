var express = require('express');
var user = require('./../models/user');
var router = express.Router();

module.exports = function(db)
{
  router.post('/', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    var newUser = new user();
    newUser.bId = req.body.bId;
    newUser.classNum = req.body.classNum;
    newUser.name = req.body.name;
    newUser.proFilePic = req.body.proFilePic;

    newUser.save(function(err){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('new User Inserted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.delete('/', function(req, res){
    user.remove({classNum: req.body.classNum}, function(err, output){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('user deleted!');
        res.status(200).json({code: 200, message: "succese"});
      }
    })
  });

  router.put('/', function(req, res){
    var query = {classNum: req.body.classNum};
    var operator = {bId: req.body.bId, classNum: req.body.classNum, name: req.body.name, proFilePic: req.body.proFilePic};
    var option = {upsert: true};

    db.collection('users').update(query, operator, option, function(err, upserted){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('user fixed!');
        res.status(200).json({code: 200, message: "succese"});
      }
    });
  });

  router.get('/', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    user.find(function(err, users){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail", err: err.message});
      }else{
        console.log('read all user!');
        var result = {
          Users: users
        };
        res.status(200).json(result);
      }
    });
  });

  router.get('/:classNum', function(req, res){
    user.findOne({classNum: req.params.classNum}, function(err, user){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read user!');
        var result = {
          User: user
        };
        res.status(200).json(result);
      }
    });
  });

  return router;
}
