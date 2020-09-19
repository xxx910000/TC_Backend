var mongoose = require('mongoose');
var testSchema = new mongoose.Schema({
    序號: String,
    類別: String,
    題目: String,
    選項A: String,
    選項B: String,
    選項C: String,
    選項D: String,
    答案: String,

});

testSchema.set('collection','test');
var model = mongoose.model('test',testSchema);
module.exports = model;