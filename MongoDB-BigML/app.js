const express = require("express")
const bodyParser = require("body-parser")
const connectDB = require('./models/mongoDBClient')
const ejs = require("ejs");
const kafkaConsumer = require('./models/kafkaConsumer');
const bigMLConnector = require('./BigMLcontroller');
const { bigMLMap, bigMLTable } = require("./models/DSPredict");
const confusionMatrixControllers = require("./controllers/confusionMatrixControllers");
const Road = require('./models/RoadSchema');

table_to_html = bigMLTable();
let canPredict = false;
connectDB()
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const PORT = 4000

app.get('/', confusionMatrixControllers.UpdateMatrix);


app.post('/', confusionMatrixControllers.UpdateMatrix);

function finishPredict(){
  canPredict = true;
}

app.post('/train',(req, res, next) => 
{ 
    res.locals.canPredict = finishPredict;
    next();
    
}
,confusionMatrixControllers.train);

  // reciving data in json format
  kafkaConsumer.fetchData((err, reply) => 
  {
    if(err) console.log(err);

    if(canPredict && reply.event === 1){ // enter section
    
      bigMLConnector.predict(reply, (err, predictOut) => 
      {
        if(err) console.log(err);
        else bigMLMap().set(reply.id, predictOut);
      });
    }
    if(canPredict && reply.event === 3){ // exit section
      const predictValue = bigMLMap().get(reply.id);
      if(predictValue != undefined && predictValue != null)
      {
        bigMLTable()["section_" + reply.roadParts][predictValue-1]++;

      }
    }
      new Road(reply).save();
  })

app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`)
})