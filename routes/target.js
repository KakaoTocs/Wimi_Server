var express = require('express');
var user = require('./../models/user');
var place = require('./../models/place');
var building = require('./../models/building');
var iBeacon = require('./../models/iBeacon');
var RPi = require('./../models/RPi');
var target = require('./../models/target');
var hub = require('./../models/hub');
var router = express.Router();

module.exports = function(db)
{
  router.get('/', function(req, res){
    target.find(function(err, targets){
      if(err){
        res.status(400).json({code: 400, message: "fail"});
      }else{
        var result = {
          users: targets
        };
        res.status(200).json(result);
      }
    })
  })
  /*router.get('/', function(req, res){
    hub.aggregate(
          [
            {$sort: {"$cur": 1}},
    				{$limit: 200}/*,
            {$group: {
              "_id": {"major": "$major", "minor": "$minor"},
              "deviceId": {$push: "$deviceId"},
              "rssi": {$push: "$rssi"},
              "cur": {$push: "$cur"}
            }}*//*
          ],
          function(err, hubs){
            if(err){
              res.status(500).json({code: 500, message: "fail", error: err.message});
            }else{
              var target = ["111", "112", "115", "114", "113", "116"];
              var list = ["RPi1", "RPi2", "RPi3"];
              var result = new Array();

              for(var k=0; k<6; k++){
                var temp = new Array();
                temp[0] = new Array();
                temp[1] = new Array();
                temp[2] = new Array();
                console.log('k: '+k)
                for(var i=0; i<3; i++){
                  console.log('i: '+i*1)
                  for(var j=0; j<hubs.length-1; j++){
                    //console.log('1: '+(hubs[j].deviceId == list[i]).toString())
                    //console.log('2: '+(temp[i][0] != null).toString())
                    //console.log(hubs[j].major.concat(hubs[j].minor), hubs[j].major.concat(hubs[j].minor) == target[k])
                    if(hubs[j].deviceId == list[i] && temp[i][0] != null && hubs[j].major.concat(hubs[j].minor) == target[k]){
                      //console.log('PASS: '+hubs[j].deviceId)
                      var time1 = new Date(temp[i][1]);
                      var time2 = new Date(hubs[j].cur);
                      console.log(time1.getSeconds()<time2.getSeconds())
                      if(time1.getSeconds()<time2.getSeconds() && hubs[j].major.concat(hubs[j].minor) == target[k]){
                        temp[i][0] = j;
                        temp[i][1] = hubs[j].cur;
                        console.log('업데이트: '+hubs[j].cur);
                      }
                    }else if(hubs[j].deviceId == list[i] && temp[i][0] == null && hubs[j].major.concat(hubs[j].minor) == target[k]){
                      temp[i][0] = j;
                      temp[i][1] = hubs[j].cur;
                      console.log('최초 값: '+temp[i][0]);
                    } //해당 인덱스 따로 저장 해놓고  밑에서 저장된 인덱스로 필요한 값 쿼리
                  }
                }
                for(var i=0; i<3; i++){
                  var time = new Date(temp[i][1]);
                  var stand = new Date();
                  console.log('시간아웃: '+(stand - time < 2).toString())
                  if(result[k] != null && result[k]<temp[i][0]){
                    result[k] = temp[i][0];
                    console.log('11');
                  }else if(result[k] == null && temp[i][0] != null){
                    result[k] = temp[i][0];
                    console.log('22');
                  }
                }
                console.log('0: '+result[0])
                console.log('1: '+result[1])
                console.log('2: '+result[2])
                console.log('3: '+result[3])
                console.log('4: '+result[4])
                console.log('5: '+result[5])
              }


              var totalResult = {
                "iBeacon1": {
                  "rssi": result[0]
                },
                "iBeacon2": {
                  "rssi": result[1]
                },
                "iBeacon3": {
                  "rssi": result[2]
                },
                "iBeacon4": {
                  "rssi": result[3]
                },
                "iBeacon5": {
                  "rssi": result[4]
                },
                "iBeacon6": {
                  "rssi": result[5]
                },
              }

              res.status(200).json(totalResult);
            }
          }
        )
    /*
    find().sort({"cur": -1}).limit(1)
    .then((err, hubs) => {
      if(err){
        res.status(500).json({code: 500, message: "fail"});
      }else{
        /*
        var result = [];
        for(var aHub in hubs){
          if(aHub.)
        }

        res.status(200).json(hubs);
      }
    })
    /*
    hub.find(function(err, hubs){
      if(err){
        res.status(500).json({code: 500, message: "fail"});
      }else{
        var result = [];
        for(var aHub in hubs){
          if(aHub.)
        }
        res.status(200).json(hubs);
      }
    })
    */
    /*
    target.find(function(err, targets){
      if(err){
        res.status(500).json({code: 500, message: "fail"});
      }else{
        var result = {
          users: targets
        };
        res.status(200).json(result);
      }
    });

  });*/

  router.post('/', function(req, res){
    var newTarget = target();
    var newHub = new hub();
    newHub.deviceId = req.body.deviceId;
    newHub.uuid = req.body.uuid;
    newHub.major = req.body.major;
    newHub.minor = req.body.minor;
    newHub.rssi = req.body.rssi;
    newHub.cur = req.body.cur;
    newHub.save();
    iBeacon.findOne({maj: req.body.major, min: req.body.minor})
    .then((ibeacons) => {
      return user.findOne({bId: ibeacons.id})
    }) //ibeacons
    .then((users) => {
      target.findOne({classNum: users.classNum})
      .then((target) => {
        if(target == null){ // 타겟이 NULL일때 새로 등록
          newTarget.classNum = users.classNum;
          newTarget.name = users.name;
          newTarget.proFilePic = users.proFilePic;
          RPi.findOne({Id: req.body.deviceId})
          .then((rpis) => {
            newTarget.location.pId = rpis.pId;
            return place.findOne({pId: newTarget.location.pId})
          })
          .then((places) => {
            newTarget.location.floor = places.floor;
            newTarget.location.pname = places.pname;
            newTarget.location.bId = places.bId;
            return building.findOne({bId: newTarget.location.bId})
          })
          .then((buildings) => {
            newTarget.location.bname = buildings.bname;
            newTarget.location.rssi = req.body.rssi;
            newTarget.location.cur = req.body.cur;
            newTarget.save();
            res.status(200).json({code: 200, message: "New Inserted"});
            return 0;
          });
        }else{ // 업데이트
          RPi.findOne({pId: target.location.pId})
          .then((rpis) => {
            if(((target.location.rssi < req.body.rssi) && (rpis.Id != req.body.deviceId) && (Number(target.location.cur)<Number(req.body.cur))) || ((rpis.Id == req.body.deviceId) && (Number(target.location.cur)<Number(req.body.cur)))){
              target.location.rssi = req.body.rssi; // 장소가 다르고때 작은값, 장소가 같을때
              target.location.cur = req.body.cur;
              RPi.findOne({Id: req.body.deviceId})
              .then((rpis) => {
                target.location.pId = rpis.pId;
                return place.findOne({pId: target.location.pId})
              })
              .then((places) => {
                target.location.floor = places.floor;
                target.location.pname = places.pname;
                target.location.bId = places.bId;
                return building.findOne({bId: target.location.bId})
              })
              .then((buildings) => {
                target.location.bname = buildings.bname;
                target.location.rssi = req.body.rssi;
                target.location.cur = req.body.cur;
                target.save()
                res.status(200).json({code: 200, message: "Update"});
                return 0;
              });
            }else{
              RPi.findOne({Id: req.body.deviceId})
              .then((rpis) => {
                if(((Number(req.body.cur)-Number(target.location.cur))>2)){ // 2초이상
                  target.location.rssi = req.body.rssi
                  target.location.cur = req.body.cur
                  target.location.pId = rpis.pId;
                  place.findOne({pId: target.location.pId})
                  .then((places) => {
                    target.location.floor = places.floor;
                    target.location.pname = places.pname;
                    target.location.bId = places.bId;
                    return building.findOne({bId: target.location.bId})
                  })
                  .then((buildings) => {
                    target.location.bname = buildings.bname;
                    target.location.rssi = req.body.rssi;
                    target.location.cur = req.body.cur;
                    target.save()
                    res.status(200).json({code: 200, message: "timeOut"});
                    return 0;
                  }); // time Out
                }else{
                  res.status(200).json({code: 200, message: "너의 의미"});
                  return 0;
                }
              })
            }
          })
        }
      })
    })
    .catch((err) => {
      res.status(400).json({code: 400, errorMessage: err.message});
    })
  });

  return router;
}
