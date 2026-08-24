# Mr.Finanzfakten — SEO-Pitch (Reveal.js-Deck)

Pitch-Deck: **GUMU Werbeagentur** → **Tim Hunger (Mr.Finanzfakten)**,
Angebot: **Soft Relaunch + laufende SEO-Betreuung** (kein SEA), mit
Preispaketen, Zeitplan und Förder-Rechnung. Kein Kundenprojekt —
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
| Vor / zurück          | Pfeil → / ← · Leertaste — Folie für Folie; **Einblendungen laufen automatisch** gestaffelt ab |
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
Hintergrundgrafiken aktiviert. Alle Einblendungen erscheinen im PDF
vollständig (Auto-Steps sind dort deaktiviert).

## ⚠️ Vor dem Versand

Preise sind final abgestimmt (2.500 € / 750 €/Monat / Eigenanteil 1.400 €).
Zum Anpassen: Kapitel 6 in `index.html` (price-card / calc) — die
Förder-Rechnung muss dann mitgezogen werden.


## Struktur

```
mff_pitch/
├─ index.html        ← 7 Kapitel als <section>, Speaker Notes inline
├─ src/
│  ├─ main.ts        ← Reveal-Init, Kapitel-Rail, Position-Card, ?-Hilfe
│  ├─ reveal.d.ts    ← Typ-Shims für Reveal 5 (strict mode)
│  └─ theme.css      ← Custom-Theme „Laut / Leise“
├─ public/assets/    ← GUMU-Logo, self-hosted Fonts
└─ .github/workflows/deploy.yml
```

## Inhalt — Kapitel (7 Kapitel / 11 Folien)

1. **Der Widerspruch** — 134.000 folgen dir · 63 finden dich (Titel)
2. **Ausgangslage & Konzept** — vier Zahlen · zwei Bausteine, ohne Werbebudget (2 Folien)
3. **Soft Relaunch** — Umbau statt Neubau auf Pillar-Cluster-Struktur · Conversion zum Beratungstermin (2 Folien)
4. **SEO-Betreuung** — Content-Engine (Du redest, wir bauen) · Reporting & AI-Sichtbarkeit (2 Folien)
5. **Zeitplan** — Sep Fundament/Förderantrag · Okt–Nov Bau · Dez Launch · ab Jan Content-Engine
6. **Investition** — Pakete & Preise · Förder-Rechnung (2 Folien)
7. **Nächster Schritt** — Termin in Chemnitz (Mailto-CTA)

## Preise & Förderung (im Deck ausgewiesen)

- **Baustein A · Soft Relaunch: 2.500 € einmalig** — Umbau der bestehenden Website auf Pillar-Cluster-Struktur, Design bleibt
- **Baustein B · SEO-Betreuung: 750 €/Monat** — Inhalte nach Keyword-Architektur **ohne Seiten-Limit**, Reporting gegen 8 Wettbewerber, AI-Tracking; **Mindestlaufzeit 6 Monate**, danach monatlich kündbar
- **Paket: 7.000 €** (Relaunch + 6 Monate SEO) — **trifft den Fördertopf von 2 × 3.500 € exakt** · Zuschuss **−5.600 €** (80 %) → **Eigenanteil 1.400 €**
- Alle Beträge netto, zzgl. USt. Förderfähigkeit vor Antragstellung prüfen; vorbehaltlich Bewilligung.
- Kein SEA — bewusst nur Website + organische Sichtbarkeit.


## Design-Konzept „Laut / Leise"

Zwei Register: **laute** dunkle Navy-Folien (Instagram-Welt — 9:16-Kachel,
große Montserrat-Zahlen, Orange) rahmen **leise** helle Angebots-Folien
(Such-Welt — Karten, Diagramme, viel Ruhe). Fach-Metriken wie Domain
Authority sind bewusst komplett draußen — nur Zahlen, die ohne Erklärung
funktionieren; der Rest steht als Sprechtext in den Speaker-Notes.

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
- Alle 11 Folien sind auf 1280×800 ohne Überlauf geprüft.
