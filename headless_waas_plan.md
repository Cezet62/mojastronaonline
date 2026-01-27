# Plan: Platforma WaaS (Headless WordPress + Astro + Netlify)

## Cel
Stworzenie platformy do masowego tworzenia i obsługi stron internetowych, wykorzystując WordPress jako system zarządzania treścią (CMS) oraz Netlify jako platformę hostingową dla frontendu (Headless Architecture).

## Architektura (Headless WordPress)
Tradycyjny WordPress łączy backend i frontend. W modelu "Headless":

1.  **Backend (WordPress)**: Służy TYLKO do edycji treści przez klienta. Może być hostowany na tanim serwerze.
2.  **API (GraphQL/REST)**: WordPress wystawia dane przez API.
3.  **Frontend (Static Site Generator)**: Astro (rekomendowane) lub Next.js pobiera dane z WP i buduje statyczne pliki HTML.
4.  **Hosting (Netlify)**: Serwuje gotowe pliki HTML. Szybki, bezpieczny, tani.

## Krok po Kroku

### 1. Backend: WordPress (Baza)
*   **Hosting**: Dowolny hosting WP, VPS lub WP Engine.
*   **Konfiguracja**:
    *   Instalacja wtyczki **WPGraphQL** (do pobierania danych).
    *   Instalacja wtyczki do webhooków (np. **WP Webhooks**) do wyzwalania buildów na Netlify.
    *   Ukrycie domyślnego frontendu (Headless Mode).

### 2. Frontend: Technologia (Widok Klienta)
*   **Technologia**: **Astro** (rekomendacja) - generuje czysty HTML, zero zbędnego JS.
*   **Alternatywa**: Next.js (dla bardziej skomplikowanych funkcji).

### 3. Automatyzacja (CI/CD)
*   **GitHub**: Repozytorium z kodem szablonu.
*   **Netlify**:
    *   "Site" połączony z repozytorium GitHub.
    *   Zmienne środowiskowe (np. `WORDPRESS_API_URL`) do obsługi różnych klientów.
*   **Webhooks**:
    *   Netlify generuje "Build Hook URL".
    *   WordPress (wtyczka) wysyła sygnał do Netlify po aktualizacji treści.
    *   Efekt: Przebudowa strony w kilkanaście sekund.

### 4. Model Biznesowy i Skalowanie
*   **Szablony**: 3-4 dopracowane szablony w Astro/Next.js.
*   **Sprzedaż**: Klient wybiera szablon -> stawiasz czystego WP -> podpinasz pod Netlify.
*   **Utrzymanie**: Statyczny HTML = bezpieczeństwo i szybkość.

## Weryfikacja Planu

### Automatyczne Testy
*   Build Status na Netlify.
*   Lighthouse (cel: 90-100 pkt).

### Weryfikacja Manualna
*   Edycja w WP -> Build -> Sprawdzenie na domenie.
*   Test formularzy (Netlify Forms).
