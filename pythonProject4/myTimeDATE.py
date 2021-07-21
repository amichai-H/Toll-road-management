class dayTime:
    def __init__(self, h, m, d):
        self.hours = h % 24
        self.minutes = m % 60
        self.day = d % 8 + 1

    def addTime(self, m):
        if (m + self.minutes) >= 60:
            self.hours = self.hours + 1
        self.minutes = (self.minutes + m) % 60
        if self.hours >= 24:
            self.day = self.day + 1
        self.hours = self.hours % 24
        if self.day > 7:
            self.day = 1

    def TimeToString(self):
        if self.minutes < 10:
            minStr = "0" + str(self.minutes)
        else:
            minStr = str(self.minutes)
        if self.hours < 10:
            hstr = "0" + str(self.hours)
        else:
            hstr = str(self.hours)
        return hstr + ":" + minStr

    def getDay(self):
        return self.day
