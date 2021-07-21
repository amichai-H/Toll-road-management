const Kafka = require('node-rdkafka');

const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'Toll-road'
});

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

function queueMessage() {
  const obj = {test: "hi", ben: "ben"}; 

  const success = stream.write(Buffer.from(JSON.stringify(obj)));  
  //const success = stream.write();        
  if (success) {
    console.log("message queued");
  } else {
    console.log('Too many messages in the queue already..');
  }
}

setInterval(() => {
  queueMessage();
}, 3000);
