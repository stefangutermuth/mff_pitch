# Mr.Finanzfakten — SEO-Pitch (One-Pager)

Einseitige, scrollbare Pitch-Website: **GUMU Werbeagentur** → **Tim Hunger
(Mr.Finanzfakten)**, Angebot für eine laufende SEO-Betreuung.
Kein Kundenprojekt — das Verkaufsinstrument selbst.

Stack (analog `wuw_pitch`): **Vite** · **Vanilla TypeScript (strict)** ·
**GSAP 3 + ScrollTrigger** · **Lenis**. Kein Framework, keine externen
CDN-Calls — Fonts (Montserrat, Inter) sind self-hosted unter
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

`dist/` ist ein statisches Artefakt (relative Pfade, `base: './'`) — lässt
sich auf jede Subdomain legen. `.github/workflows/deploy.yml` deployt bei
Push auf `main` automatisch zu GitHub Pages (identisch zum wuw_pitch-Setup).

## ⚠️ Vor dem Versand

**Preise eintragen.** Alle vier Phasen enthalten sichtbare Platzhalter
(gestrichelte Amber-Chips). Im Markup suchbar über:

```
data-placeholder="preis-phase-0" … "preis-phase-3"
```

Der Text `___ €` ist absichtlich als Platzhalter erkennbar.
Fußnote „Alle Beträge netto, zzgl. USt." steht bereits im Plan-Abschnitt.

## Modi

| URL | Verhalten |
|---|---|
| `/` | Voll animiert (Lenis Smooth Scroll, Scroll-Reveals, gepinnte Auffächerung) |
| `/?static` | Keine Bewegung, alles sichtbar — für PDF-Export („Drucken → als PDF") und Screenshots |
| Deep-Links | `/#widerspruch` `/#kein-zufall` `/#stattdessen` `/#luecke` `/#beweis` `/#plan` `/#gumu` `/#termin` |

`prefers-reduced-motion` wird respektiert (verhält sich wie `?static`).
Ohne JavaScript ist die Seite vollständig lesbar.

## Design-Konzept „Laut / Leise"

Das Thema des Pitches — 134.000 Follower vs. 63 Suchbesucher — ist auch das
Gestaltungssystem: zwei Register, die im Layout aufeinandertreffen.

- **Laute Welt (Instagram):** dunkle Navy-Flächen, vertikale 9:16-Kachel,
  große Montserrat-Zahlen, Orange.
- **Leise Welt (Suche):** kühles helles Papier, horizontale SERP-Zeilen in
  Systemschrift (damit Suchergebnisse wie Suchergebnisse aussehen), viel Ruhe.
- **Signature-Moment:** Sektion „Der Beweis" — der `rente-mit-70`-Artikel
  wird beim Scrollen gepinnt, 25 Keyword-Chips fächern aus der Artikel-Karte
  auf. Der eine choreografierte Moment der Seite; alles andere ruhig.

**Palette** (zitiert aus dem MFF-Logo, nicht kopiert):

| Token | Wert | Rolle |
|---|---|---|
| Navy | `#063560` | MFF-Logo-Navy — dunkle Flächen, Headlines |
| Night | `#04223c` | Tiefe im Verlauf |
| Orange | `#f8a000` | MFF-Logo-Orange — Akzent, CTA, Tims Zeile |
| Papier | `#f5f8fb` | kühler heller Grund (Such-Welt) |
| Tinte | `#16334f` | Fließtext |
| Linie | `#d9e2ec` | Borders |

Dazu funktional: `#9c6200` (Amber für kleinen Text auf Hell, WCAG),
`#1e9e33` (zitiertes Check-Grün der MFF-Website).
**Schrift:** Montserrat 700/800 (Display — Tims Website-Schrift) +
Inter 400/600 (Fließtext).

## Qualität (geprüft, Production-Build)

- Lighthouse: **Performance 99 · Accessibility 100 · Best Practices 100**
  (SEO-Score ist absichtlich niedrig: `noindex` — private Pitch-Seite)
- LCP 1,8 s · CLS 0 · TBT 0 ms
- Kein horizontaler Overflow bis 320 px Breite
- Sichtbarer Keyboard-Fokus, Skip-Link, `prefers-reduced-motion`

## Inhalt — Argumentationslinie

1. **Der Widerspruch** — 134.000 folgen dir, 63 finden dich
2. **Warum das kein Zufall ist** — Reichweite bleibt in der App; 4 Rankings, alle Marke/Name
3. **Wer stattdessen gefunden wird** — finanzfluss/finanztip; 21 getrackte Keywords, 0 Rankings
4. **Die Lücke** — Branchenranking; Platz 1 hat DA 8, Tim DA 19
5. **Der Beweis** — ein Artikel, 25 Rankings (Signature)
6. **Der Plan** — Phase 0 Fundament · 1 Content-Engine · 2 Conversion · 3 Reporting & AI-Sichtbarkeit
7. **Warum GUMU** — Google/Meta Partner, WordPress, Nähe (Flöha/Chemnitz), Setup läuft
8. **Der nächste Schritt** — Termin in Chemnitz (Mailto-CTA)

**Alle Zahlen** stammen aus dem Briefing (Ubersuggest, Stand August 2026;
Studie versicherungenmitkopf.de, Juni 2026). Keine Zahl wurde erfunden;
Garantie-Aussagen sind bewusst ausgeschlossen.
