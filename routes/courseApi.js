var express = require('express');
var router = express.Router();
var Model = require('../models/courseModel');

//取得商品資料
router.get('/',function(req,res){
    Model.find({coursetype:req.query.coursetype},function(err,data){
        if(err){
            res.json({"status":1,"msg":"error"});
          }
          else{
            res.json({"status":0,"msg":"success","data":data});
          }
    });
});

module.exports = router;