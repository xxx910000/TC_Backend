var mongoose = require('mongoose');
var pvpSchema = new mongoose.Schema({
    account: String,
    winning: Number,
    fail: Number,

});

pvpSchema.set('collection','pvp');
var model = mongoose.model('pvp',pvpSchema);
module.exports = model;