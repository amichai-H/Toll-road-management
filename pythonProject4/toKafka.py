from kafka import KafkaProducer
import socket
import json


class kafka:
    def __init__(self):
        self.conf = {'bootstrap.servers': "host1:9092,host2:9092",
                     'client.id': socket.gethostname()}
        # self.producer = Producer(self.conf)
        self.producer = KafkaProducer(bootstrap_servers='localhost:9092',value_serializer=lambda v: json.dumps(v).encode('utf-8'))

    def acked(self, err, msg):
        if err is not None:
            print("Failed to deliver message: %s: %s" % (str(msg), str(err)))
        else:
            print("Message produced: %s" % (str(msg)))

    def sendMSG(self, value):
        #self.producer.produce('Toll-road', value.dumps(value).encode('utf-8'))
        # Wait up to 1 second for events. Callbacks will be invoked during
        # this method call if the message is acknowledged.
        #self.producer.poll(1)
        self.producer.send('Toll-road',value)
