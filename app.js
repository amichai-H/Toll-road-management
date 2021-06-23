const path = require('path');
const http = require('http');


const express = require('express');
const {client, fetchData, sendData } = require('./models/redisClient');

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
    sendData("new data");
    fetchData();
});

// if got here return error 404
//app.use(errorController.get404);


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

server.listen(3003, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port");
})