import random
from enum import Enum
import proccesor
import toKafka

mykafka = toKafka.kafka()

event = [1, 2, 3, 4]  # ["enter to road", "enter to section", "exit from road", "exit from section"]

id = 0
mypros = proccesor.pros()


class direction(Enum):
    UP = 1
    DOWN = 2


class Vehicle:
    def __init__(self, vehicleType):
        global id
        self.onRoad = False
        self.vehicleType = vehicleType
        self.roadParts = 0
        self.color = 1;
        self.id = id
        ls = random.randint(1, 2)
        if ls == 1:
            self.direction = direction.UP
        else:
            self.direction = direction.DOWN
        self.countSection = 0
        id += 1

    def gnerateData(self, eventT, day, time, specialDay, color):
        return {"event": eventT,
                "roadParts": self.roadParts,
                "carType": self.vehicleType,
                "day": day,
                "time": time,
                "Special": specialDay,
                "color": color,
                "id": self.id}

    def stayOnRoad(self, time, day, specialDay):
        if self.roadParts == 3:
            self.exitFromRoad(time, day, specialDay)
            return
        self.countSection += 1
        if self.countSection - self.vehicleType > 1:
            self.exitFromRoad(time, day, specialDay)
        if self.onRoad:
            if self.direction == direction.UP:
                if self.roadParts >= 5:
                    self.roadParts = 5
                    self.exitFromRoad(time, day, specialDay)
                    return
                self.roadParts = self.roadParts + 1
                newEvent = self.gnerateData(event[3], day, time, specialDay, 1)
                self.send(newEvent)  # send to server
            else:
                if self.roadParts <= 1:
                    self.roadParts = 1
                    self.exitFromRoad(time, day, specialDay)
                    return
                newEvent = self.gnerateData(event[3], day, time, specialDay, 2)
                self.send(newEvent)  # send to server
                self.roadParts = self.roadParts - 1

            newEvent = self.gnerateData(event[1], day, time, specialDay, 3)
            self.send(newEvent)  # send to server

    def exitFromRoad(self, time, day, specialDay):
        if self.onRoad:
            self.countSection = 0
            newEvent = self.gnerateData(event[2], day, time, specialDay, 4)
            self.onRoad = False
            self.send(newEvent)  # send to server

    def getOnRoad(self, time, day, specialDay):
        if not self.onRoad:
            self.countSection = 1
            self.roadParts = random.randint(1, 5)
            self.onRoad = True
            newEvent = self.gnerateData(event[0], day, time, specialDay, 5)
            self.send(newEvent)  # send to server

    def geberateEvent(self, number, time, day, specialDay):
        if number == 1:
            self.stayOnRoad(time, day, specialDay)
            return
        if number == 2:
            self.getOnRoad(time, day, specialDay)
            return
        if number == 3:
            self.stayOnRoad(time, day, specialDay)
            # self.exitFromRoad(time, day, specialDay)
            return

    def send(self, newEvent):
        mypros.addData(newEvent)
        mykafka.sendMSG(value = newEvent)
        print(str(newEvent))  # send to server


def finish():
    mypros.dataToCSV()


def generateVehicle(x):
    vehicleArray = []
    for i in range(x):
        vehicleArray.append(Vehicle(random.randint(1, 3)))
    return vehicleArray
