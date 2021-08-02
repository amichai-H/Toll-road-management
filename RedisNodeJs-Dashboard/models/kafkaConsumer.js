const Kafka = require('node-rdkafka');

var consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092',
}, {});

// fetch data from kafka server, the given data is in json format
const fetchData = callback => 
{
    consumer.connect();
    console.log("kafkaConsumer connected");

    consumer.on('ready',() => {
        console.log('consumer ready..')
        consumer.subscribe(['Toll-road']);
        consumer.consume();
      }).on('data', data => 
      {
        var msg = JSON.parse(data.value);
        callback(null, msg);

      }).on('event.error', err => 
      {
        console.log(err);
        callback(err);
      });
}

module.exports = {
    fetchData: fetchData,
  };
