var express = require('express');
var router = express.Router();
var Model = require('../models/shopModel');

//取得商品資料
router.post('/',function(req,res){
    Model.find({goodid:{$regex:req.body.type}},function(err,data){
        if(err){
            res.json({"status":1,"msg":"error"});
          }
          else{
            res.json({"status":0,"msg":"success","data":data});
          }
    });
});

module.exports = router;