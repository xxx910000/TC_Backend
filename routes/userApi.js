var express = require('express');
var router = express.Router();
var Model = require('../models/userModel');
const { route } = require('.');

//登入功能
router.post('/login', function (req, res) {
  Model.findOne({
      account: req.body.account,
      password: req.body.password
  }, function (err, data) {
      if (data == null) {
          res.json({ "status": 1, "msg": "帳號密碼錯誤!" });
      }
      else {
          if (err) {
              res.json({ "status": 1, "msg": "error!" });
          }
          else {
              res.json({
                  "status": 0, "msg": "success",
                  "data": data
              });
          }
      }
  });
});

//註冊功能
router.post('/register', function (req, res) {
  var newuser = new Model({
      account: req.body.account,
      password: req.body.password,
      name: req.body.name,
      
  })
  Model.count({ account: req.body.account }, function
      (err, data) {
      if (data > 0) {
          res.json({ "status": 1, "msg": "帳號已被註冊!" });
      }
      else {
        newuser.save(function (err, data) {
              if (err) {
                  res.json({ "status": 1, "msg": "error" });
              }
              else {
                  res.json({
                      "status": 0, "msg": "success"
                      , "data": data
                  });
              }
          });
      }
  });
});

//取得user資料
router.post('/',function(req,res){
  Model.findOne({ account: req.body.account },function(err,data){
    if(err){
      res.json({"status":1,"msg":"error"});
    }
    else{
      res.json({"status":0,"msg":"success","data":data});
    }
  });
});

//忘記密碼
router.post('/forgetpsw', function (req, res) {

    Model.updateOne({ account: req.body.account },{ password: req.body.password}, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "帳號錯誤!" });
        }
        if(err){
            res.json({"status":1,"msg":"error"});
          }
          else{
            res.json({"status":0,"msg":"success","data":data});
          }
    });
  });


module.exports = router;