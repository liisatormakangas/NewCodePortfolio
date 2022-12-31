import pygame
import random

class Robo:
    def __init__(self):
        pygame.init()
        pygame.display.set_caption("Fancy Robo Game")

        self.naytto = pygame.display.set_mode((640, 480))
        self.kolikko = pygame.image.load("images/kolikko.png")
        self.robo = pygame.image.load("images/robo.png")
        self.hirvio = pygame.image.load("images/hirvio.png")
        self.ovi = pygame.image.load("images/ovi.png")

        self.fontti = pygame.font.SysFont("Arial", 24)

        self.x = random.randint(0, 640 - self.robo.get_width())
        self.y = random.randint(0, 480 - self.robo.get_height())
        self.x_ovi = random.randint(0, 640 - self.ovi.get_width())
        self.y_ovi = random.randint(80, 480 - self.ovi.get_height())

        self.pisteet = 5
        self.level = 1
        
        self.oikealle = False
        self.vasemmalle = False
        self.ylos = False
        self.alas = False
        self.gameOver = False

        self.maara_hirvio = 4
        self.maara_kolikko = 5
        self.hirviot = []
        self.kolikot = []

        self.kello = pygame.time.Clock()

        self.lataa_kolikot()
        self.lataa_hirviot()
        self.aloitus()
        
    def lataa_hirviot(self):
        for i in range(self.maara_hirvio):
            self.hirviot.append([-500, 500])

    def lataa_kolikot(self):
        for i in range(self.maara_kolikko):
            self.kolikot.append([-1000, 500])
        
    def tapahtumat(self):
        for tapahtuma in pygame.event.get():

            if tapahtuma.type == pygame.KEYDOWN:
                if tapahtuma.key == pygame.K_LEFT:
                    self.vasemmalle = True
                if tapahtuma.key == pygame.K_RIGHT:
                    self.oikealle = True
                if tapahtuma.key == pygame.K_UP:
                    self.ylos = True
                if tapahtuma.key == pygame.K_DOWN:
                    self.alas = True

            if tapahtuma.type == pygame.KEYUP:
                if tapahtuma.key == pygame.K_LEFT:
                    self.vasemmalle = False
                if tapahtuma.key == pygame.K_RIGHT:
                    self.oikealle = False
                if tapahtuma.key == pygame.K_UP:
                    self.ylos = False
                if tapahtuma.key == pygame.K_DOWN:
                    self.alas = False

            if tapahtuma.type == pygame.QUIT:
                exit()
        
        #kolikoiden liike
        for i in range(self.maara_kolikko):
            if self.kolikot[i][1] + self.kolikko.get_height() >= 480:
                self.pisteet -= 1
                self.kolikot[i][0] = random.randint(0, 640-self.kolikko.get_width())
                self.kolikot[i][1] = -random.randint(100,1000)

            if self.kolikot[i][1]+self.kolikko.get_height() < 480:
                if self.level == 1:
                    self.kolikot[i][1] += self.level
                else:
                    if self.level < 4:
                        self.kolikot[i][1] += self.level - 0.5
                    else:
                        self.kolikot[i][1] += 2
            else:
                if self.kolikot[i][0] < -self.kolikko.get_width() or self.kolikot[i][0] > 640:
                    self.kolikot[i][0] = random.randint(0, 640-self.kolikko.get_width())
                    self.kolikot[i][1] = -random.randint(100,1000)
                
            #kolikon kerääminen
            if self.y + self.robo.get_height() >= self.kolikot[i][1] and self.y <= self.kolikot[i][1] + self.kolikko.get_height() and self.x <= self.kolikot[i][0] + self.kolikko.get_width() and  self.x + self.robo.get_width() >= self.kolikot[i][0]:
                self.pisteet += 1
                self.kolikot[i][0] = random.randint(0, 640-self.kolikko.get_width())
                self.kolikot[i][1] = -random.randint(100,1000)

        #hirviöiden liike
        for i in range(self.maara_hirvio):
            if self.hirviot[i][1] + self.hirvio.get_height() >= 480:
                self.hirviot[i][0] = random.randint(0, 640-self.hirvio.get_width())
                self.hirviot[i][1] = -random.randint(100,1000)

            if self.hirviot[i][1] + self.hirvio.get_height() < 480:
                if self.level == 1:
                    self.hirviot[i][1] += self.level
                else:
                    if self.level < 4:
                        self.hirviot[i][1] += self.level - 0.5
                    else:
                        self.hirviot[i][1] += 2
            else:
                if self.hirviot[i][0] < -self.hirvio.get_width() or self.hirviot[i][0] > 640:
                    self.hirviot[i][0] = random.randint(0, 640-self.hirvio.get_width())
                    self.hirviot[i][1] = -random.randint(100,1000)

            #hirviöön törmääminen
            if self.y + self.robo.get_height() >= self.hirviot[i][1] + 15 and self.y <= self.hirviot[i][1] + self.hirvio.get_height() -15 and self.x <= self.hirviot[i][0] + self.hirvio.get_width() -15 and  self.x + self.robo.get_width() >= self.hirviot[i][0] + 15:
                self.gameOver = True

        #robon liikkuminen
        if self.oikealle:
            self.x += self.level + 1
        if self.vasemmalle:
            self.x -= self.level + 1
        if self.ylos:
            self.y -= self.level + 1
        if self.alas:
            self.y += self.level + 1
        
        #asetetaan seinät, joista ei pääse läpi
        if self.x <= 0:
            self.vasemmalle = False
            self.x = 0
        if self.x + self.robo.get_width() >= 640:
            self.oikealle = False
            self.x = 640 - self.robo.get_width()
        if self.y <= 0:
            self.ylos = False
            self.y = 0
        if self.y + self.robo.get_height() >= 480:
            self.alas = False
            self.y = 480 - self.robo.get_height()

        #peli loppuu, jos pisteitä -5 
        if self.pisteet == -5:
            self.gameOver = True

    def piirra_naytto(self):
        self.teksti1 = self.fontti.render(f"Pisteet: {self.pisteet}", True, (0, 252, 252))
        self.teksti2 = self.fontti.render(f"Leveli: {self.level}", True, (0, 252, 252))
        self.teksti3 = self.fontti.render(f"Mene ovesta!!", True, (255, 0, 0))
        self.teksti4 = self.fontti.render(f"Varo seiniä!!", True, (255, 0, 0))
        self.teksti5 = self.fontti.render(f"Kerää täsmälleen 10 kolikkoa. Varo mörköjä!", True, (255, 0, 0))
        self.teksti6 = self.fontti.render(f"Jos kolikko osuu maahan: -1 piste   |   -5 pistettä: peli loppuu", True, (255, 0, 0))
        self.teksti7 = self.fontti.render(f"GAME OVER", True, (0, 0, 0))
        self.teksti8 = self.fontti.render(f"pisteet: {self.pisteet if self.level < 2 else (self.level - 1) * 10 + self.pisteet}", True, (255, 0, 0))
        
        #perliruudun taustaväri levelin mukaan
        self.naytto.fill((252, 173, 3))
        if self.level == 3:
            self.naytto.fill((59, 59, 59))
        if self.level >= 4:
            self.naytto.fill((0, 0, 0))

        pygame.draw.rect(self.naytto, (255, 0, 0), (485, 15, 110, 70))
        pygame.draw.rect(self.naytto, (0, 0, 0), (488, 18, 104, 64))

        self.naytto.blit(self.teksti2, (500, 20))
        self.naytto.blit(self.teksti1, (500, 50))
        self.naytto.blit(self.teksti5, (80, 10))
        self.naytto.blit(self.teksti6, (40, 440))
        self.naytto.blit(self.robo, (self.x, self.y))

        for i in range(self.maara_kolikko):
            self.naytto.blit(self.kolikko, (self.kolikot[i][0], self.kolikot[i][1]))

        for i in range(self.maara_hirvio):
            self.naytto.blit(self.hirvio, (self.hirviot[i][0], self.hirviot[i][1]))

        #levelillä 2 seinät muuttuvat vaarallisiksi
        if self.level >= 2:
            self.naytto.blit(self.teksti4, (250, 50))
            pygame.draw.rect(self.naytto, (255, 0, 0), (0, 0, 10, 480))
            pygame.draw.rect(self.naytto, (255, 0, 0), (630, 0, 10, 480))
            if self.x <= 10 or self.x + self.robo.get_width() >= 630:
                self.gameOver = True

        #kun levelillä kerätty 10 kolikkoa, ovi seuraavalle levelille
        if self.pisteet == 10:
            self.naytto.blit(self.ovi, (self.x_ovi, self.y_ovi))
            self.naytto.blit(self.teksti3, (240, 100))
            if self.y + self.robo.get_height() >= self.y_ovi and self.y <= self.y_ovi + self.ovi.get_height() and self.x <= self.x_ovi + self.ovi.get_width() and  self.x + self.robo.get_width() >= self.x_ovi:
                self.level +=1
                self.pisteet = 0

        pygame.display.flip()        

        self.kello.tick(60)

    def aloitus(self):
        while not self.gameOver:
            self.piirra_naytto()
            self.tapahtumat()

        self.naytto.fill((252, 173, 3))
        self.naytto.blit(self.teksti7, (250, 100))
        self.naytto.blit(self.teksti8, (270, 180))

        pygame.display.flip()

        while True:
            for tapahtuma in pygame.event.get():
                if tapahtuma.type == pygame.QUIT:
                    exit()
                    
if __name__ == "__main__":
    Robo()