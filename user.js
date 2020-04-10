let mongoose=require("mongoose");
var timestamps = require('mongoose-timestamp');

let person=new mongoose.Schema({
    name : String,
    age : String
});

person.plugin(timestamps);

module.exports=mongoose.model('person', person);