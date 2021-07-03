const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on("error", (error) => {
    console.error(error);
});

const sendData = value => {
    client.set("RoadINFO", "ben",(err, reply) => {
        console.log("send" + reply)
    });
};

const fetchData = () => {
    client.get("RoadINFO" ,(err, reply) => {
        console.log("get" +reply)
    });
};


module.exports = {
    client,
    sendData: sendData,
    fetchData: fetchData
  };


