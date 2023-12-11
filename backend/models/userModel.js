const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type:String,require: true},
  password:{type:String,required:true},
  email:{type:String,rrequire: true},
  phonenumber:{type:Number},
});

module.exports = mongoose.model('users', userSchema);