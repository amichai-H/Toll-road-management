import csv


# class for debugging
class pros:
    def __init__(self):
        self.data = {}
        self.file = open('events.csv', 'w')
        self.file.write('"in","car","day","Special","color","out"\n')

    def addData(self, secin, secout, car, day, color, Special):
        self.file.write(
            str(secin) + "," + str(car) + "," + str(day) + "," + str(Special) + "," + str(color) + "," + str(
                secout) + "\n")
        self.file.flush()
