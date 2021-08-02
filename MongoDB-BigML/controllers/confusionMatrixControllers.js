const { bigMLMap, bigMLTable } = require("../models/DSPredict");
const build_data = require('./algo');
const bigMLConnector = require('../BigMLcontroller');

const UpdateMatrix = (req,res) => 
{
    res.render("predictTable",{table_to_html : table_to_html})
}

const Postpredict = (req,res) =>
{
    table_to_html = bigMLTable();
    console.log(bigMLTable());
    res.render("predictTable",{table_to_html : table_to_html});
}

const train = (req,res) =>{
   console.log("Start train")
  
   Road.find({},function(err,users){
    build_data(users);
    bigMLConnector.train();
    res.locals.canPredict=true;
   });
    res.redirect("/");
}

module.exports = {
    train: train,
    Postpredict: Postpredict,
    UpdateMatrix: UpdateMatrix
  };
