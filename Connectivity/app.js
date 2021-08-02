const express = require("express")
const bodyParser = require("body-parser")
const connectDB = require('./DB/connection')
const mongoose = require("mongoose")
const ejs = require("ejs");
const build_data = require('./algo/algo')


connectDB()
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const PORT = 3000

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

    const Road = mongoose.model("Road",RoadSchema);
    //let test = new Road({'event': 1, 'roadParts': 4, 'carType': 3, 'day': 1, 'time': '07:21', 'Special': false, 'color': 1, 'id': 94});


app.get('/', (req,res) =>{
res.render("predictTable")

})


app.post('/predict', (req,res) =>{

console.log("predict");
})

app.post('/train',(req,res) =>{
 Road.find({},function(err,users){
  build_data(users);
 });
  res.redirect("/");
})





app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`)
})