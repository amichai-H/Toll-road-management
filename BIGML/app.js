const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/table', (req, res) => {
    res.render('./pages/predictTable');
});

//------------ Socket.io ----------------
io.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("totalWaitingCalls", (msg) => { console.log(msg.totalWaiting) });
    socket.on("callDetails", (msg) => { console.log(msg);kafka.publish(msg) });
    socket.on("update", (msg) => { console.log("here is app js need to train");});
});

server.listen(port, () => {
    console.log(`Ariel app listening at http://localhost:${port}`);
});