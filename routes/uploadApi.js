var express = require('express');
var router = express.Router();
var upload = require('../middleware/upload');
var Model = require('../models/uploadModel');
var remove = require('../utils/fileTool');
var userModel = require('../models/userModel');

//上傳檔案
router.post("/",upload.array('file'),function(req,res,next){ 
    var upload = [];
    for(var i=0;i<req.files.length;i++){
    var upload_ = 
    {
        account: req.query.account,
        filename: req.files[i].filename,
        size: req.files[i].size,
        path: req.files[i].path,
        encoding: req.files[i].encoding,
        mimetype: req.files[i].mimetype,
        destination: req.files[i].destination,   
    }
    upload.push(upload_);
}
    Model.insertMany(upload,function (err, data) {
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

//取得檔案列表
router.get('/',function(req,res){
    Model.find({account:req.query.account},function(err,data){
        if(err){
            res.json({"status":1,"msg":"error"});
          }
          else{
            res.json({"status":0,"msg":"success","data":data});
          }
    })
})

//刪除檔案
router.delete("/",function(req,res,next){
    console.log(req.body._id);
    Model.deleteOne({_id:req.body._id},function(err,data){
        if(err){
            res.json({"status":1,"msg":"error"});
        }
        else{
            res.json({"status":0,"msg":"success","data":data});
            remove(req.body.filename);
        }
    });
});

//上傳使用者相片
router.patch("/photo", upload.single("file"), function (req, res, next) {

    userModel.updateOne({ account: req.body.account },{photo:req.file.filename},{upsert: true}, function (err,data) {
        // data.photo.push(req.file.filename);
        // data.markModified('photo');
        // data.save(function(err){
            if(err){
                res.json({"status":1,"msg":"error"});
              }
              else{
                res.json({"status":0,"msg":"success","data":data});
              }
        // })       
    });
});

module.exports = router;