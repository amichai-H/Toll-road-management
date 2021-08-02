const mongoose = require("mongoose")

const RoadSchema= new mongoose.Schema({
    event:Number,
    roadParts:Number,
    carType: Number,
    day : Number,
    time : String,
    Special : Boolean,
    color : Number,
    id: Number
    });

module.exports = Road = mongoose.model("Road",RoadSchema);