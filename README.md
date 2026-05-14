# Smart Home Hub (gRPC + WebSockets)

**Autorzy:** Klaudiusz Staniszewski 34479 oraz Jakub Kamiński 34490
**Temat projektu:** Smart Home Hub (gRPC + WebSockets): Symulator urządzeń IoT komunikujących się z centralą przez wydajne gRPC, podczas gdy użytkownik steruje nimi przez dashboard webowy (WebSockets)

## Opis architektury

Projekt to rozproszony system IoT działający w architekturze mikroserwisów. Składa się z trzech głównych komponentów:

1. **IoT Devices (Klienci gRPC):** Symulatory inteligentnych urządzeń (np. czujniki w Salonie i Kuchni), które cyklicznie generują dane telemetryczne i wysyłają je do centrali z wykorzystaniem wydajnego, binarnego protokołu gRPC.
2. **Central Hub (Serwer gRPC + WebSockets):** Serce systemu. Działa jako serwer gRPC nasłuchujący raportów od urządzeń oraz jako serwer WebSockets, który w czasie rzeczywistym (bez odświeżania strony) wypycha odebrane dane do interfejsu graficznego.
3. **Dashboard Webowy (Klient WebSockets):** Lekki interfejs użytkownika, który dynamicznie reaguje na komunikaty z centrali i aktualizuje statusy urządzeń na żywo.

## Instrukcja uruchomienia
1. Sklonuj repozytorium.
2. Skopiuj plik `.env.example` do pliku `.env` (lub upewnij się, że plik `.env` istnieje w głównym katalogu) i zdefiniuj w nim porty:
3. Uruchom system w tle korzystając z Docker Compose:
    docker-compose up -d
4. Otwórz plik `dashboard/index.html` w dowolnej przeglądarce, aby zobaczyć działający interfejs na żywo.