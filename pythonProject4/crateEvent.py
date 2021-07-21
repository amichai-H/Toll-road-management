import random
import datetime

event = ["enter to road", "enter to section", "exit from road", "exit from section"]
roadParts = [1, 2, 3, 4, 5]
carType = [1, 2, 3]


def getBooleanSpecial():
    day = random.randint(1, 365)
    if day < 50:
        return True
    return False


def getRandomH():
    min = random.randint(0, 60)
    h = random.randint(0, 23)
    if min < 10:
        minstr = "0" + str(min)
    else:
        minstr = str(min)
    if h < 10:
        hstr = "0" + str(h)
    else:
        hstr = str(h)
    return hstr + ":" + minstr


def newRandomEvent():
    day = random.randint(0, 7)
    time = getRandomH()
    newEvent = {"event": event[random.randint(0, len(event) - 1)],
                "roadParts": roadParts[random.randint(0, len(roadParts) - 1)],
                "carType": carType[random.randint(0, len(carType) - 1)],
                "day": day,
                "time": time,
                "Special": getBooleanSpecial()}
    return newEvent
