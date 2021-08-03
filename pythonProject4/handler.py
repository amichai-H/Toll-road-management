import random
from time import sleep

import myTimeDATE
import vehicleOB
from queue import Queue


# This class controls all the conduct of new vehicles that are added to the crystal and makes sure that they
# update themselves
class vHandler:
    def __init__(self, number):
        self.vehicles = vehicleOB.generateVehicle(number)
        self.onRoad = Queue()  # represent the road
        self.i = 0
        self.time = myTimeDATE.dayTime(0, 0, 0)
        self.addToRoad()

    def addToRoad(self):
        for i in self.vehicles:
            self.time.addTime(random.randint(2, 5))
            i.getOnRoad(self.time.TimeToString(), self.time.getDay(), self.time.getSpai())
            self.onRoad.put(i)

    # this is the main iteration to update any car in the queue
    def iteration(self):
        sleep(0.15)
        self.time.addTime(random.randint(2, 5))
        if random.randint(1, 5) == 5:
            cars = vehicleOB.generateVehicle(3)
            for i in cars:
                self.time.addTime(random.randint(2, 5))
                i.getOnRoad(self.time.TimeToString(), self.time.getDay(), self.time.getSpai())
                self.onRoad.put(i)
        if not self.onRoad.empty():
            temp = self.onRoad.get()
            stayOn = temp.action(self.time.TimeToString(), self.time.getDay(), self.time.getSpai())
            if stayOn:
                self.onRoad.put(temp)

    def addCars(self, number):
        self.vehicles = vehicleOB.generateVehicle(number)
        self.addToRoad()

    # keep the road alive
    def runIt(self):
        while True:
            if self.onRoad.empty():
                print("no cars")
                self.addCars(20)
                sleep(1)
            self.iteration()
