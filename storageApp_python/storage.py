# Tee tehtävän 2 ratkaisu tänne
class Varastoluettelo():
    def __init__(self):
        pass

    def alusta_tiedosto(self, tiedosto):
        with open(tiedosto, "w") as file:
            file.write("\n")

    def lisaa_esine(self, esine: str, tiedosto):
        try:
            with open(tiedosto, "a") as file:
                file.write(esine+"\n")
            print(f"\n'{esine}', 1 kpl, on onnistuneesti lisätty tiedostoon")
        except:
            print("virhe tiedostoon kirjoitettaessa. Yritä uudestaan.")

    def hae_esineet(self, tiedosto):
        esineet = []
        try:
            with open(tiedosto) as file:
                for rivi in file:
                    rivi = rivi.replace("\n", "")
                    if len(rivi) == 0:
                        continue
                    esineet.append(rivi)
            return esineet
        except:
            print("Virhe tiedoston käsittelyssä. Yritä uudestaan.")

    def poista_kaikki(self, poistettava: str, tiedosto):
        esineet = []
        try:
            with open(tiedosto) as file:
                for rivi in file:
                    rivi = rivi.replace("\n", "")
                    esineet.append(rivi)
            if poistettava not in esineet:
                raise ValueError("Esinettä ei ole tiedostossa")
    
            esineet_uusi = [esine for esine in esineet if esine != poistettava]

            with open(tiedosto, "w") as file:
                for esine in esineet_uusi:
                    file.write(esine+"\n")

            print(f"\n'{poistettava}' on poistettu kokonaan tiedostosta")
        except:
            print("\nTapahtui virhe tiedoston käsittelyssä. Esinettä ei ole tiedostossa.")

    def poista_yksi(self, poistettava, tiedosto):
        esineet = []
        try:
            with open(tiedosto) as file:
                for rivi in file:
                    rivi = rivi.replace("\n", "")
                    if len(rivi) == 0:
                        continue
                    esineet.append(rivi)
            if poistettava not in esineet:
                raise ValueError("Esinettä ei ole tiedostossa")
            esineet.remove(poistettava)
            
            with open(tiedosto, "w") as file:
                for esine in esineet:
                    file.write(esine+"\n")

            print(f"\n'{poistettava}', 1 kpl, on poistettu tiedostosta")
        except:
            print("\nTapahtui virhe tiedoston käsittelyssä. Esinettä ei ole tiedostossa.")

class Varastosovellus:
    def __init__(self):
        self.__listaus = Varastoluettelo()
    
    def luo_tiedosto(self, tiedosto):
        self.__listaus.alusta_tiedosto(tiedosto)

    def esineen_lisays(self, tiedosto):
        esine = input("Anna esine, jonka haluat lisätä: ")
        self.__listaus.lisaa_esine(esine, tiedosto)

    def listaa_esineet(self, tiedosto):
        esineet = self.__listaus.hae_esineet(tiedosto)
        print("\nTiedostossa olevat esineet:")
        lista = {esine : esineet.count(esine) for esine in esineet}
        for avain, arvo in lista.items():
            print(f"{avain}, {arvo} kpl")
    
    def hae_esine(self, tiedosto):
        esine = input("Anna esine, jonka tiedot haluat hakea: ")
        esineet = self.__listaus.hae_esineet(tiedosto, esine)
        print(f"\n{esine}, {esineet.count(esine)} kpl")
    
    def poista_kaikki_esineet(self, tiedosto):
        esine = input("Anna esine, jotka haluat poistaa tiedostosta kokonaan: ")
        self.__listaus.poista_kaikki(esine, tiedosto)

    def poista_esine(self, tiedosto):
        esine = input("Anna esine, jonka haluat poistaa tiedostosta: ")
        self.__listaus.poista_yksi(esine, tiedosto)

    def ohje(self):
        print("Voit käyttää seuraavia komentoja: ")
        print("1 = lisää listaan")
        print("2 = listaa kaikki tuotteet")
        print("3 = hae tuote listalta")
        print("4 = poista kaikki tietyt tuotteet listalta")
        print("5 = vähennä yksi tuote listalta")
        print("6 = apua")
        print("7 = sulje sovellus")

    def suorita(self):
        print("Tämä on sovellus varastonhallintaan!")
        tiedosto = input("Anna nimi tekstitiedostolle (esim. data.txt), johon haluat tallentaa dataa: ")
        self.luo_tiedosto(tiedosto)
        
        while True:
            print("")
            self.ohje()
            print("")
            try:
                komento = int(input("Anna komento (1-7): "))
            except ValueError:
                print("\nVirheellinen syöte, anna luku 1-7")
                continue

            if komento == 7:
                break
            elif komento == 1:
                self.esineen_lisays(tiedosto)
            elif komento == 2:
                self.listaa_esineet(tiedosto)
            elif komento == 3:
                self.hae_esine(tiedosto)
            elif komento == 4:
                self.poista_kaikki_esineet(tiedosto)
            elif komento == 5:
                self.poista_esine(tiedosto)
            elif komento == 6:
                self.ohje()

sovellus = Varastosovellus()
sovellus.suorita()

