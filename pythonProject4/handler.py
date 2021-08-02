import random
from time import sleep

import myTimeDATE
import vehicleOB
from queue import Queue


class vHandler:
    def __init__(self, number):
        self.vehicles = vehicleOB.generateVehicle(number)
        self.onRoad = Queue()
        self.i = 0
        self.time = myTimeDATE.dayTime(0, 0, 0)
        self.addToRoad()

    def addToRoad(self):
        for i in self.vehicles:
            self.time.addTime(random.randint(2, 5))
            i.getOnRoad(self.time.TimeToString(), self.time.getDay(), self.time.getSpai())
            self.onRoad.put(i)

    def iteration(self):
        sleep(3)
        self.time.addTime(random.randint(2, 5))
        if not self.onRoad.empty():
            temp = self.onRoad.get()
            stayOn = temp.action(self.time.TimeToString(), self.time.getDay(), self.time.getSpai())
            if stayOn:
                self.onRoad.put(temp)

    def addCars(self, number):
        self.vehicles = vehicleOB.generateVehicle(number)
        self.addToRoad()

    def runIt(self):
        while True:
            if self.onRoad.empty():
                print("no cars")
                self.addCars(100)
                sleep(3)
            self.iteration()