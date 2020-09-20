var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    account: String,
    password: String,
    username: String,
    score: Number,
    money: Number,
    study: Number,
    goal: [],
    photo:[],
});

userSchema.set('collection','user');
var model = mongoose.model('user',userSchema);
module.exports = model;