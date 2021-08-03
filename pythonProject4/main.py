import handler

if __name__ == '__main__':
    simulator = handler.vHandler(10)  # start with 10 cars
    try:
        simulator.runIt()
    except KeyboardInterrupt:
        pass
    finally:
        print("exit")
