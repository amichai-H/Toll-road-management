const path = require('path');
const http = require('http');


const express = require('express');
const redis = require('./models/redisClient');
const kafkaConsumer = require('./models/kafkaConsumer');


const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/dashboard', (req, res) => {
    res.render(path.join(__dirname, 'views/dashboard.ejs'));
});

// if got here return error 404
//app.use(errorController.get404);

io.on('connection', socket => {

    console.log('client connected');
    
    socket.on('disconnect', () => {
      console.log('client disconnected');
    });

    // reciving data in json format
    kafkaConsumer.fetchData((err, reply) => 
    {
        if(err) console.log(err);
        //console.log(JSON.stringify(reply));

        redis.storeData(reply)
        .then(() => 
        {
          redis.numOfVehicles()
          .then(replies => socket.emit('UpdateStats', replies))
          .catch(err => console.log(err));

          redis.occurrenceOfField('carType', 3) // 3 possible types
          .then(reply => socket.emit('UpdatePieChart', reply, "In Roads"))
          .catch(err => console.log(err));  

          redis.occurrenceOfField('event', 4) // 4 possible types
          .then(reply => socket.emit('UpdateBarChart', reply, 'In Roads'))
          .catch(err => console.log(err)); 

          redis.whatIsTheDay()
          .then(reply => socket.emit('UpdateDay', reply))
          .catch(err => console.log(err)); 

          redis.IsSpecialDay()
          .then(reply => socket.emit('UpdateSpecialDay', reply))
          .catch(err => console.log(err)); 

        })
        .catch(err => console.log(err));
    })
  });

server.listen(3003, err => 
  {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port");
  })