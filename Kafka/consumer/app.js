const Kafka = require('node-rdkafka');

var consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();

consumer.on('ready', () => {
  console.log('consumer ready..')
  consumer.subscribe(['Toll-road']);
  consumer.consume();
}).on('data', function(data) {
  var msg = JSON.parse(data.value);
  console.log(`received message: ${JSON.stringify(msg)}`);
});

// using https://docs.confluent.io/platform/current/quickstart/cos-docker-quickstart.html for connecting kafka with docker