# FALAK | فلك — Current Implementation Audit Report

## 1. Architectural Map
Falak (فلك) is a PHP monolithic web application utilizing custom templating and lightweight vanilla JavaScript modules:
- **Routing & Entrypoint:** `index.php` processes all incoming requests, interacting with `includes/function.php` and `QuranForAll` in `includes/class.php`. Clean URLs are handled via `.htaccess`.
- **Core APIs:**
  - `api/quran/`: Manages Quranic text (Uthmani script), Tafsir (`includes/tafseer/`), Translations (`includes/translate/`), and reciter audio sources.
  - `api/books/`: Manages Islamic Library categories, languages, and book metadata (`api/books/book-api.php`).
  - `includes/HadithProvider.php` & `includes/SeerahProvider.php`: Modular PHP data providers for Hadith records and Seerah historical timeline entries.
- **Frontend & Templates:**
  - `style/default/`: Templates (`header.htm`, `hero.htm`, `content.htm`, `footer.htm`).
  - `style/default/css/falak-tokens.css`: CSS Variables (`--falak-*`) for light/dark themes and RTL layout.
  - `style/default/js/`: Modular JS scripts (`falak-theme.js`, `audio-player.js`, `bookmarks.js`, `memorization.js`, `adhkar.js`, `command-palette.js`, `dashboard.js`, `quran.js`, `falak-tools.js`).

---

## 2. Implemented JavaScript Modules
- `falak-theme.js`: Dark Mode toggle and `data-theme` attribute management.
- `bookmarks.js`: Unified `FalakStorage` layer supporting `NAMESPACES` (`falak.settings`, `falak.bookmarks`, `falak.favorites`, `falak.history`, `falak.memorization`, `falak.goals`, `falak.audio`), `KEYS` legacy alias, and JSON backup export/import (`exportData` / `importData`).
- `memorization.js`: `FalakMemorization` module tracking memorized Surahs, ayah levels, daily goals, and migration from legacy `falak_memorization_progress` to `falak.memorization`.
- `audio-player.js`: `FalakAudio` global floating player supporting playback, progress seeking, playback speed (0.75x–2x), and Media Session API.
- `command-palette.js`: `FalakSearch` modal palette triggered via `Ctrl + K` for instant Surah and Tafsir lookup.
- `adhkar.js`: `FalakAdhkar` supporting Morning, Evening, Sleep, Prayer, and General Adhkar categories with counters and reset capabilities.
- `dashboard.js`: `FalakDashboard` rendering personal stats, last read position, and daily goal progress.
- `quran.js`: `FalakReader` managing font resizing, line height adjustments, settings persistence, and `playAudio` backward compatibility.

---

## 3. Data Storage & Schema
- Client-side data is stored in `localStorage` under versioned schema (`schemaVersion: "1.0.0"`).
- Legacy keys (`falak_bookmarks`, `falak_reading_history`, `falak_memorization_progress`) are automatically migrated and preserved.

---

## 4. PWA & Offline Shell
- `manifest.json`: Web app manifest specifying icons and branding.
- `sw.js`: Service worker implementing a Network-First strategy for dynamic HTML pages and APIs, and Cache-First strategy for static CSS/JS assets.
