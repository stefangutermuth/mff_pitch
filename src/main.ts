// Reveal-Init für das Mr.Finanzfakten-Pitch-Deck.
// Steuerung wie wuw_pitch: Pfeile Folie für Folie, Hoch/Runter =
// Kapitelsprung, Kapitel-Rail unten, Position-Card oben links, ?-Hilfe,
// Speaker-View (S), ?print-pdf. Einblendungen (.step) laufen AUTOMATISCH
// gestaffelt ab, sobald eine Folie erscheint — kein Durchklicken nötig.

import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';

import 'reveal.js/dist/reveal.css';
// Helles Basis-Theme als Grundlage, danach unser Custom-Theme.
import 'reveal.js/dist/theme/white.css';

import './theme.css';

const prefersReducedMotion =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isPrint = window.location.search.includes('print-pdf');

// Springt zum nächsten (dir=1) bzw. vorherigen (dir=-1) Top-Level-Kapitel.
// Wird an die Hoch/Runter-Tasten gebunden — Kapitelwechsel statt Unterfolien.
function jumpChapter(dir: number) {
  const total = document.querySelectorAll('.reveal .slides > section').length;
  const { h } = deck.getIndices() as { h: number };
  const target = Math.min(Math.max(h + dir, 0), total - 1);
  if (target !== h) deck.slide(target, 0);
}

const deck = new Reveal({
  hash: true,
  slideNumber: false, // ersetzt durch Chapter-Rail unten
  progress: false,    // ersetzt durch Chapter-Rail
  controls: true,
  controlsTutorial: false,
  controlsLayout: 'edges',
  controlsBackArrows: 'visible',
  center: false,
  // Linear: Rechts/Links blättern durch ALLE Folien & Unterfolien (inkl. Fragmente)
  navigationMode: 'linear',
  transition: prefersReducedMotion ? 'none' : 'slide',
  transitionSpeed: 'default',
  backgroundTransition: prefersReducedMotion ? 'none' : 'fade',
  width: 1280,
  height: 800,
  margin: 0.06,
  minScale: 0.2,
  maxScale: 2.0,
  // Hoch/Runter = Kapitelwechsel (Sprung), nicht Unterfolien.
  // Bild-auf/-ab bleiben bewusst lineares Vor/Zurück (für Presenter-Clicker).
  keyboard: {
    38: () => jumpChapter(-1), // ↑ vorheriges Kapitel
    40: () => jumpChapter(1)   // ↓ nächstes Kapitel
  },
  plugins: [Notes]
});

// Transition differenzieren: horizontal = slide, vertikale Unterfolien = fade.
// Reveal liest data-transition pro <section>. Wir setzen vor dem Init.
function differentiateTransitions() {
  document
    .querySelectorAll<HTMLElement>('.reveal .slides > section > section')
    .forEach((sec) => {
      if (!sec.hasAttribute('data-transition')) {
        sec.setAttribute('data-transition', 'fade');
      }
    });
}

differentiateTransitions();

// === Auto-Steps: Einblendungen laufen von selbst ==========================
// Elemente mit .step erscheinen gestaffelt, sobald ihre Folie aktiv wird.
// Optionales data-step="1" schiebt ein Element ans Ende der Sequenz
// (z. B. die Pointe nach den Datenzeilen). Bei prefers-reduced-motion und
// im ?print-pdf-Modus bleibt alles sofort sichtbar.
const STEP_BASE_DELAY = 0.4; // Sekunden nach Folienwechsel
const STEP_STAGGER = 0.16;

function playSteps(slide: Element | null | undefined) {
  if (!slide || prefersReducedMotion || isPrint) return;
  const steps = Array.from(slide.querySelectorAll<HTMLElement>('.step')).sort(
    (a, b) => Number(a.dataset.step ?? 0) - Number(b.dataset.step ?? 0)
  );
  steps.forEach((el) => {
    el.classList.remove('is-in');
    el.style.animationDelay = '';
  });
  // Reflow erzwingen, damit die Animation beim Wiederbetreten neu startet.
  void (slide as HTMLElement).offsetWidth;
  steps.forEach((el, i) => {
    el.style.animationDelay = `${STEP_BASE_DELAY + i * STEP_STAGGER}s`;
    el.classList.add('is-in');
  });
}

deck.initialize().then(() => {
  updateNavigation();
  playSteps(document.querySelector('.reveal .slides section.present:not(:has(> section))') ??
    document.querySelector('.reveal .slides section.present'));
});

deck.on('slidechanged', (event) => {
  updateNavigation();
  const e = event as { currentSlide?: Element };
  playSteps(e?.currentSlide);
});

// Für Debugging/QA erreichbar machen.
(window as unknown as { deck: typeof deck }).deck = deck;

// === Chapter-Rail + Position-Card =========================================
const topLevelSections = Array.from(
  document.querySelectorAll<HTMLElement>('.reveal .slides > section')
);
const chapterTitles = topLevelSections.map(
  (s) => s.getAttribute('data-title') ?? ''
);

const railEl = document.getElementById('chapter-rail');
const pcNum = document.getElementById('pc-num');
const pcTitle = document.getElementById('pc-title');
const pcSub = document.getElementById('pc-sub');
const pcV = document.getElementById('pc-v');
const pcVTotal = document.getElementById('pc-v-total');
const pcSubDots = document.getElementById('pc-sub-dots');

// Chapter-Rail einmalig bauen — klickbare Segmente,
// jedes mit Slot für Sub-Ticks (Unter-Folien-Anzeige).
function buildChapterRail() {
  if (!railEl) return;
  railEl.innerHTML = '';
  topLevelSections.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'chapter-node';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Kapitel ${i + 1} — ${chapterTitles[i] || ''}`);
    btn.title = `${String(i + 1).padStart(2, '0')} · ${chapterTitles[i] || ''}`;
    btn.innerHTML =
      `<span class="bar"><span class="sub-ticks"></span></span>` +
      `<span class="num">${String(i + 1).padStart(2, '0')}</span>`;
    btn.addEventListener('click', () => deck.slide(i, 0));
    railEl!.appendChild(btn);
  });
}

function updateNavigation() {
  const { h, v } = deck.getIndices() as { h: number; v: number };

  // Chapter-Rail: Knoten-States + Sub-Ticks (immer sichtbar bei Kapiteln mit Unterfolien)
  if (railEl) {
    Array.from(railEl.children).forEach((node, i) => {
      node.classList.toggle('current', i === h);
      node.classList.toggle('past', i < h);

      const subEl = node.querySelector('.sub-ticks') as HTMLElement | null;
      if (!subEl) return;

      const subCount = topLevelSections[i].querySelectorAll(':scope > section').length;
      node.classList.toggle('has-subs', subCount > 1);

      // Sub-Ticks für JEDES Kapitel mit Unterfolien aufbauen (einmal)
      if (subCount > 1 && subEl.childElementCount !== subCount) {
        subEl.innerHTML = '';
        for (let k = 0; k < subCount; k++) {
          const t = document.createElement('span');
          t.className = 'tick';
          subEl.appendChild(t);
        }
      }

      // Active/passed-States nur im aktuellen Kapitel; bei den anderen alle neutral
      Array.from(subEl.children).forEach((t, k) => {
        if (i === h) {
          t.classList.toggle('active', k === (v ?? 0));
          t.classList.toggle('passed', k < (v ?? 0));
        } else if (i < h) {
          // Komplett vergangene Kapitel: alle Ticks als "passed"
          t.classList.add('passed');
          t.classList.remove('active');
        } else {
          // Kommende Kapitel: alle Ticks neutral
          t.classList.remove('passed');
          t.classList.remove('active');
        }
      });
    });
  }

  // Position-Card: Nummer + Titel
  if (pcNum) pcNum.textContent = String(h + 1).padStart(2, '0');
  if (pcTitle) pcTitle.textContent = chapterTitles[h] || '';

  // Unterfolien-Info
  const chapter = topLevelSections[h];
  if (!chapter || !pcSub || !pcV || !pcVTotal || !pcSubDots) return;
  const verticals = chapter.querySelectorAll(':scope > section');
  const vTotal = verticals.length;

  if (vTotal > 1) {
    pcSub.hidden = false;
    pcV.textContent = String((v ?? 0) + 1);
    pcVTotal.textContent = String(vTotal);

    if (pcSubDots.childElementCount !== vTotal) {
      pcSubDots.innerHTML = '';
      for (let i = 0; i < vTotal; i++) {
        const d = document.createElement('span');
        d.className = 'pc-dot';
        pcSubDots.appendChild(d);
      }
    }
    Array.from(pcSubDots.children).forEach((dot, i) => {
      dot.classList.toggle('active', i === (v ?? 0));
      dot.classList.toggle('passed', i < (v ?? 0));
    });
  } else {
    pcSub.hidden = true;
    pcSubDots.innerHTML = '';
  }
}

buildChapterRail();

// === Keyboard-Help-Overlay ================================================
const helpEl = document.getElementById('kbd-help');

function toggleHelp(force?: boolean) {
  if (!helpEl) return;
  const next = force ?? !helpEl.classList.contains('open');
  helpEl.classList.toggle('open', next);
  helpEl.setAttribute('aria-hidden', next ? 'false' : 'true');
}

window.addEventListener('keydown', (e) => {
  // ? oder Shift+/
  if (e.key === '?' || (e.shiftKey && e.key === '/')) {
    e.preventDefault();
    toggleHelp();
  } else if (e.key === 'Escape' && helpEl?.classList.contains('open')) {
    e.preventDefault();
    e.stopPropagation();
    toggleHelp(false);
  }
});

helpEl?.addEventListener('click', (e) => {
  if (e.target === helpEl) toggleHelp(false);
});
