# Smart Home Hub (gRPC + WebSockets)

**Autorzy:** Klaudiusz Staniszewski 34479 oraz Jakub Kamiński 34490
**Temat projektu:** Smart Home Hub (gRPC + WebSockets): Symulator urządzeń IoT komunikujących się z centralą przez wydajne gRPC, podczas gdy użytkownik steruje nimi przez dashboard webowy (WebSockets)

## Opis architektury

Projekt to rozproszony system IoT działający w architekturze mikroserwisów. Składa się z trzech głównych komponentów:

1. **IoT Devices (Klienci gRPC):** Symulatory inteligentnych urządzeń (np. czujniki w Salonie i Kuchni), które cyklicznie generują dane telemetryczne i wysyłają je do centrali z wykorzystaniem wydajnego, binarnego protokołu gRPC.
2. **Central Hub (Serwer gRPC + WebSockets):** Serce systemu. Działa jako serwer gRPC nasłuchujący raportów od urządzeń oraz jako serwer WebSockets, który w czasie rzeczywistym (bez odświeżania strony) wypycha odebrane dane do interfejsu graficznego.
3. **Dashboard Webowy (Klient WebSockets):** Lekki interfejs użytkownika, który dynamicznie reaguje na komunikaty z centrali i aktualizuje statusy urządzeń na żywo.

## Instrukcja uruchomienia

Projekt jest w pełni skonteneryzowany i gotowy do uruchomienia jedną komendą, bez konieczności lokalnej instalacji środowiska Node.js.

1. Sklonuj repozytorium.
2. Skopiuj plik `.env.example` do pliku `.env` (lub upewnij się, że plik `.env` istnieje w głównym katalogu) i zdefiniuj w nim porty:
   ```env
   WS_PORT=8080
   GRPC_PORT=50051
   HUB_SECRET_TOKEN=twoj_sekret
3. Uruchom system w tle korzystając z Docker Compose:
    docker-compose up -d
4. Otwórz plik `dashboard/index.html` w dowolnej przeglądarce, aby zobaczyć działający interfejs na żywo.

## Spełnione wymagania techniczne

* **Komunikacja:** Zastosowano gRPC (z plikiem kontraktu `.proto`) do komunikacji wewnątrzsieciowej oraz WebSockets do komunikacji z klientem webowym.
* **Optymalizacja obrazów:** Kontenery bazują na oficjalnych, lekkich obrazach `node:alpine`, co znacząco redukuje ich rozmiar docelowy i przyspiesza budowanie.
* **Bezpieczeństwo i konfiguracja:** Całkowity zakaz "hardkodowania" danych. Porty, identyfikatory urządzeń oraz klucze konfiguracyjne wstrzykiwane są dynamicznie przez plik `.env` i mapowane w `docker-compose.yml`.
* **Izolacja sieciowa:** Mikroserwis urządzenia łączy się z centralą za pomocą wewnętrznej sieci Dockera (używając nazwy serwisu `central-hub`), a nie przez `localhost`.