var mongoose = require('mongoose');
var testrecordSchema = new mongoose.Schema({
    account: String,
    record:[],
    

});

testrecordSchema.set('collection','testrecord');
var model = mongoose.model('testrecord',testrecordSchema);
module.exports = model;