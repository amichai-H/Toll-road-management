import csv


class pros:
    def __init__(self):
        self.data = {}

    def addData(self, event):
        if event["event"] == 1:
            self.data[event["id"]] = {'in': event["roadParts"],
                                      'car': event["carType"],
                                      'day': event["day"],
                                      'Special': event["Special"],
                                      'out': -1
                                      }
        if event["event"] == 3:
            self.data[event["id"]]['out'] = event["roadParts"]

    def dataToCSV(self):
        with open('events.csv', 'w') as f:
            f.write('"in","car","day","Special","out"\n')
            for key in self.data.keys():
                if self.data[key]['out'] != -1:
                    for i in self.data[key].keys():
                        if i == 'Special':
                            f.write('"%s",' % (self.data[key][i]))
                        else:
                            f.write('"%s",' % numTOString(self.data[key][i]))
                    f.write("\n")


def numTOString(num):
    if num <= 1:
        return 'one'
    elif num == 2:
        return 'two'
    elif num == 3:
        return 'three'
    elif num == 4:
        return 'four'
    elif num == 5:
        return 'five'
    elif num >= 6:
        return 'six'
    else:
        return num
