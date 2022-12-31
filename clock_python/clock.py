import pygame
from datetime import datetime
import math

class Clock:
    def __init__(self):
        pygame.init()
        self.display = pygame.display.set_mode((640, 480))
        self.clock = pygame.time.Clock()

        self.hour_x = 0
        self.hour_y = 0
        self.min_x = 0
        self.min_y = 0
        self.sec_x = 0
        self.sec_y = 0

        self.radius_s = 200
        self.radius_m = 185
        self.radius_h = 160

        self.start_time()

    def draw_clock(self):
        self.display.fill((0, 0, 0))
        pygame.draw.circle(self.display, (255, 0, 0), (640/2, 480/2), 220)
        pygame.draw.circle(self.display, (0, 0, 0), (640/2, 480/2), 217)
        pygame.draw.circle(self.display, (255, 0, 0), (640/2, 480/2), 10)

    def clock_ticking(self):
        for action in pygame.event.get():
            if action.type == pygame.QUIT:
                exit()
        
        time = datetime.now().time()
        hours = float(time.strftime("%H"))
        minutes = float(time.strftime("%M"))
        seconds = float(time.strftime("%S"))

        hour_hand = pygame.draw.line(self.display, (0, 0, 255), (640/2, 480/2), (self.hour_x, self.hour_y), 6)
        minute_hand = pygame.draw.line(self.display, (0, 0, 255), (640/2, 480/2), (self.min_x, self.min_y), 4)
        second_hand = pygame.draw.line(self.display, (0, 0, 255), (640/2, 480/2), (self.sec_x, self.sec_y), 2)
        
        self.sec_x = 640/2+math.cos(2*math.pi*(seconds - 15)/60)*self.radius_s
        self.sec_y = 480/2+math.sin(2*math.pi*(seconds - 15)/60)*self.radius_s

        self.min_x = 640/2+math.cos(2*math.pi*(minutes-15)/60)*self.radius_m
        self. min_y = 480/2+math.sin(2*math.pi*(minutes-15)/60)*self.radius_m

        self.hour_x = 640/2+math.cos(2*math.pi*(hours-3)/12)*self.radius_h
        self.hour_y = 480/2+math.sin(2*math.pi*(hours-3)/12)*self.radius_h

        pygame.display.flip()

        self.clock.tick(60)

    def start_time(self):
        while True:
            self.draw_clock()
            self.clock_ticking()

if __name__ == "__main__":
    Clock()


    

   
   