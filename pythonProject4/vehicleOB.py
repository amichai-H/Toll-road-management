import random
from enum import Enum
import proccesor
import toKafka
import json

# mykafka = toKafka.kafka()

event = [1, 2, 3, 4]  # ["enter to road", "enter to section", "exit from road", "exit from section"]

id = 0
mypros = proccesor.pros()


class Direction(Enum):
    UP = 1
    DOWN = 2


class Color(Enum):
    BLUE = 1
    RED = 2
    ORANGE = 3
    GREEN = 4
    PURPLE = 5


class Vehicle:
    def __init__(self, vehicleType):
        global id
        self.onRoad = False
        self.vehicleType = vehicleType
        self.roadParts = 0
        self.id = id
        self.inAt = 0
        self.outAt = 0
        ls = random.randint(1, 2)
        if ls == 1:
            self.direction = Direction.UP
        else:
            self.direction = Direction.DOWN
        self.countSection = 0
        self.color = random.choice(list(Color))
        id += 1

    def gnerateData(self, eventT, day, time, specialDay):
        return {"event": eventT,
                "roadParts": self.roadParts,
                "carType": self.vehicleType,
                "day": day,
                "time": time,
                "Special": specialDay,
                "color": self.color.value,
                "id": self.id}

    def stayOnRoad(self, time, day, specialDay):
        newEvent = self.gnerateData(event[3], day, time, specialDay)
        self.send(newEvent)
        self.countSection += 1
        if self.direction == Direction.UP:
            self.roadParts += 1
        else:
            self.roadParts -= 1
        if self.roadParts > 5:
            self.roadParts = 4
            self.direction = Direction.DOWN
        if self.roadParts < 1:
            self.roadParts = 2
            self.direction = Direction.UP
        newEvent = self.gnerateData(event[1], day, time, specialDay)
        self.send(newEvent)

    def exitFromRoad(self, time, day, specialDay):
        if self.onRoad:
            self.countSection = 0
            newEvent = self.gnerateData(event[2], day, time, specialDay)
            self.onRoad = False
            self.send(newEvent)  # send to server
            mypros.addData(self.inAt, self.outAt, self.vehicleType, day, self.color.name, specialDay)

    def getOnRoad(self, time, day, specialDay):
        if not self.onRoad:
            self.countSection = 1
            self.roadParts = randomINT5(self.vehicleType)
            self.inAt = self.roadParts
            self.onRoad = True
            newEvent = self.gnerateData(event[0], day, time, specialDay)
            self.send(newEvent)  # send to server
            if self.color == Color.PURPLE:
                self.outAt = 2
            if self.vehicleType == 3:
                self.outAt = 1
                return
            if self.vehicleType == 1 and self.color == Color.ORANGE:
                self.outAt = 2
                return
            if self.vehicleType == 1 and self.color == Color.BLUE:
                self.outAt = 3
                return
            if self.vehicleType == 1 and self.color == Color.RED:
                self.outAt = 4
                return
            if self.vehicleType == 1 and self.color == Color.GREEN:
                self.outAt = 5
                return
            if self.vehicleType == 2 and self.color == Color.ORANGE:
                self.outAt = 5
                return
            if self.vehicleType == 2 and self.color == Color.BLUE:
                self.outAt = 4
                return
            if self.vehicleType == 2 and self.color == Color.RED:
                self.outAt = 3
                return
            if self.vehicleType == 2 and self.color == Color.GREEN:
                self.outAt = 2
                return

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

    def action(self, time, day, specialDay):
        if self.outAt == 0:
            print("EEEEEEEE!!!!")
        if not self.onRoad:
            return False
        if self.outAt == self.roadParts:
            self.exitFromRoad(time, day, specialDay)
            return False
        else:
            self.stayOnRoad(time, day, specialDay)
            return True

    def send(self, newEvent):
        # mypros.addData(newEvent)
        # mykafka.sendMSG(0,newEvent)
        json_object = json.dumps(newEvent)
        print(json_object)
        #print(str(newEvent))  # send to server

    def fix(self, time, day, specialDay):
        self.exitFromRoad(time, day, specialDay)


def generateVehicle(x):
    vehicleArray = []
    for i in range(x):
        ch = random.randint(1, 8)
        if ch < 5:
            ch = 1
        elif ch == 5:
            ch = 3
        else:
            ch = 2
        vehicleArray.append(Vehicle(ch))
    return vehicleArray


def randomINT5(v):
    if v == 3 and random.randint(0, 1) == 1:
        return 4
    i = random.randint(1, 30)
    if i < 5:
        return 1
    if i < 15:
        return 2
    if i < 20:
        return 3
    if i < 25:
        return 4
    return 5
