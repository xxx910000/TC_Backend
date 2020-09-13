var mongoose = require('mongoose');
var uploadSchema = new mongoose.Schema({
    account: String,
    uploadid: String,
    description: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
},{
    timestamps:true
});

uploadSchema.set('collection','upload');
var model = mongoose.model('upload',uploadSchema);
module.exports = model;