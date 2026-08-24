# Mr.Finanzfakten — SEO-Pitch (Reveal.js-Deck)

Pitch-Deck: **GUMU Werbeagentur** → **Tim Hunger (Mr.Finanzfakten)**,
Angebot für eine laufende SEO-Betreuung. Kein Kundenprojekt —
das Verkaufsinstrument selbst.

**Handhabung identisch zum `wuw_pitch`** (Kapitel-Rail, Position-Card,
Speaker-View, PDF-Export), **Optik im „Laut / Leise"-Design** der
Mr.Finanzfakten-Marke.
Stack: **Reveal.js 5** · **Vite** · **TypeScript (strict)**. Keine externen
CDN-Calls — Fonts (Montserrat, Inter) self-hosted unter
`public/assets/fonts/` (DSGVO).

## Setup

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build   # tsc --noEmit && vite build → dist/
```

`dist/` ist statisch deploybar. `.github/workflows/deploy.yml` deployt bei
Push auf `main` zu GitHub Pages (identisch zum wuw_pitch-Setup).

## Präsentieren

| Funktion              | Bedienung                                                    |
|-----------------------|--------------------------------------------------------------|
| Vor / zurück (linear) | Pfeil → / ← · Leertaste — durch alle Folien, Unterfolien & Einblendungen |
| Kapitel wechseln      | Pfeil ↑ / ↓ (Sprung zum vorherigen/nächsten Kapitel)         |
| Übersicht (Grid)      | `ESC` oder `O`                                               |
| **Speaker View**      | `S` (Notizen, Timer, nächste Folie)                          |
| Vollbild              | `F`                                                          |
| Schwarzer Bildschirm  | `B`                                                          |
| Tastatur-Hilfe        | `?`                                                          |

Kapitel-Rail unten ist klickbar (Mini-Pillen = Unterfolien). Deep-Links über
die URL (`#/3/1` = Kapitel 4, Folie 2).

## PDF-Export

Im Browser `?print-pdf` an die URL anhängen (z. B.
`http://localhost:5173/?print-pdf`), dann **Drucken → Als PDF speichern**,
Format 1280×800 bzw. **A4 Querformat**, Ränder **Keine**,
Hintergrundgrafiken aktiviert. Fragmente erscheinen im PDF vollständig.

## ⚠️ Vor dem Versand

**Preise eintragen.** Beide Plan-Folien (Kapitel 6) enthalten sichtbare
Platzhalter (gestrichelte Amber-Chips), im Markup suchbar über:

```
data-placeholder="preis-phase-0" … "preis-phase-3"
```

## Struktur

```
mff_pitch/
├─ index.html        ← 8 Kapitel als <section>, Speaker Notes inline
├─ src/
│  ├─ main.ts        ← Reveal-Init, Kapitel-Rail, Position-Card, ?-Hilfe
│  ├─ reveal.d.ts    ← Typ-Shims für Reveal 5 (strict mode)
│  └─ theme.css      ← Custom-Theme „Laut / Leise“
├─ public/assets/    ← GUMU-Logo, self-hosted Fonts
└─ .github/workflows/deploy.yml
```

## Inhalt — Kapitel (8 Kapitel / 12 Folien)

1. **Der Widerspruch** — 134.000 folgen dir · 63 finden dich (Titel)
2. **Kein Zufall** — Reichweite bleibt in der App; 4 Rankings, alle Marke/Name
3. **Wer stattdessen** — SERP-Demo finanzfluss/finanztip · 21 Keywords, 0 Rankings (2 Folien)
4. **Die Lücke** — Branchenranking · Duell Platz 1 vs. Tim (DA 8 vs. 19) (2 Folien)
5. **Der Beweis** — ein Artikel, 25 Rankings · die Messlatte (2 Folien)
6. **Der Plan** — Phase 0 Fundament · 1 Content-Engine · 2 Conversion · 3 Reporting & AI (2 Folien)
7. **Warum GUMU** — Nähe (Flöha/Chemnitz), Google/Meta Partner, Setup läuft
8. **Nächster Schritt** — Termin in Chemnitz (Mailto-CTA)

Jedes Kapitel hat **Speaker Notes** (`<aside class="notes">`, Taste `S`) mit
den Detailzahlen als Sprechtext.

## Design-Konzept „Laut / Leise"

Zwei Register: **laute** dunkle Navy-Folien (Instagram-Welt — 9:16-Kachel,
große Montserrat-Zahlen, Orange) wechseln mit **leisen** hellen Folien
(Such-Welt — SERP-Mockups in Systemschrift, viel Ruhe). Der Beweis-Moment:
der `rente-mit-70`-Artikel fächert per Einblendungen in 25 Rankings auf.

**Palette** (zitiert aus dem MFF-Logo): Navy `#063560` · Night `#04223c` ·
Orange `#f8a000` · Papier `#f5f8fb` · Tinte `#16334f` · Linie `#d9e2ec`
(+ funktional `#9c6200` Amber-auf-Hell, `#1e9e33` Check-Grün).
**Schrift:** Montserrat 700/800 (Display) + Inter 400/600 (Text).

## Hinweise

- Alle Zahlen: Ubersuggest (Stand August 2026) und Studie
  „Die besten Versicherungs-Instagrammer Deutschlands"
  (versicherungenmitkopf.de, Juni 2026). Nichts erfunden, keine Garantien.
- `prefers-reduced-motion` wird respektiert (keine Transitions/Fragment-Animationen).
- Seite steht auf `noindex` — privater Pitch.
- Alle 12 Folien sind auf 1280×800 ohne Überlauf geprüft.
