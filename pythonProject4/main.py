# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
from time import sleep

import crateEvent
import myTimeDATE
import vehicleOB
import handler
import random
import proccesor

import json
import requests

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    simulator = handler.vHandler(10)
    try:
        simulator.runIt()
    # data = crateEvent.newRandomEvent()
    # data_json = json.dumps(data)
    # payload = {'json_payload': data_json, 'apikey': 'YOUR_API_KEY_HERE'}
    # r = requests.get('127.0.0.1', data=payload)
    # myTime = myTimeDATE.dayTime(0, 0, 0)
    # myVehicle = vehicleOB.generateVehicle(400)
    # queue = []
    # i = 0
    # try:
    #     while True:
    #         sleep(1)
    #         myTime.addTime(random.randint(2, 10))
    #         myVehicle[i % len(myVehicle)].geberateEvent(random.randint(1, 3), myTime.TimeToString(), myTime.getDay(),
    #                                                     myTime.getSpai())
    #         i += 1
    #         # myVehicle[random.randint(0, len(myVehicle)-1)].geberateEvent(random.randint(1, 3), myTime.TimeToString(),
    #         # myTime.getDay(), bool(random.getrandbits(1)))
    except KeyboardInterrupt:
        pass
    finally:
        print("exit")
