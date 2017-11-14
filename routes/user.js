var express = require('express');
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
var user = require('./../models/user');
var express = require('express');
var router = express.Router();

module.exports = function(db)
{
  router.post('/', function(req, res){
    var newUser = new user();
    newUser.id = req.body.id;
    newUser.classNum = req.body.classNum;
    newUser.name = req.body.name;

    newUser.save(function(err){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('newUser Inserted!');
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
    var operator = {id: req.body.id, classNum: req.body.classNum, name: req.body.name};
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
    user.find(function(err, users){
      if(err){
        console.log(err);
        res.status(400).json({code: 400, message: "fail"});
      }else{
        console.log('read all user!');
        res.status(200).json(users);
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
        res.status(200).json(user);
      }
    });
  });

  return router;
}
