var mongoose = require('mongoose');
var courseSchema = new mongoose.Schema({
    courseprovider: String,
    coursetype: String,
    coursechapter: String,
    price: Number,
    description: String,
    uploadtime:Date,

},{
    timestamps:true
});

courseSchema.set('collection','course');
var model = mongoose.model('course',courseSchema);
module.exports = model;