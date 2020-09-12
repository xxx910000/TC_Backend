var express = require('express');
var router = express.Router();
var Model = require('../models/pvpModel');

//取得戰績資料
router.get('/',function(req,res){
    Model.findOne({account:req.query.account},function(err,data){
        if(err){
            res.json({"status":1,"msg":"error"});
          }
          else{
            res.json({"status":0,"msg":"success","data":data});
          }
    });
});

module.exports = router;