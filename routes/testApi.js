var express = require('express');
var router = express.Router();
var testModel = require('../models/testModel');
var testRecordModel = require('../models/testRecordModel');

//取得試題資料
router.get('/',function(req,res){
  testModel.find(function(err,data){
        if(err){
            res.json({"status":1,"msg":"error"});
          }
          else{
            res.json({"status":0,"msg":"success","data":data});
          }
    }).limit(5);
});

//儲存答題紀錄
router.put('/',function(req,res){
  
  var newrecord = new testRecordModel({
    account: req.query.account,
    record: req.body,
    
});
newrecord.save(function(err,data){
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

});

//取得答題記錄
router.get('/record',function(req,res){
  testRecordModel.find(function(err,data){
        if(err){
            res.json({"status":1,"msg":"error"});
          }
          else{
            res.json({"status":0,"msg":"success","data":data});
          }
    });
});


module.exports = router;