var mongoose = require('mongoose');
var goodSchema = new mongoose.Schema({
    goodid: String,
    goodname: String,
    price: Number,
    description: String,

});

goodSchema.set('collection','shop');
var model = mongoose.model('shop',goodSchema);
module.exports = model;