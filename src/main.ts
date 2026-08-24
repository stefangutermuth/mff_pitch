// MFF-Pitch — Scroll-Verhalten.
// Progressive Enhancement: Ohne JS (und bei prefers-reduced-motion)
// ist die Seite komplett statisch lesbar; alle Anfangszustände
// setzt ausschließlich GSAP, nie das CSS.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import './theme.css';

gsap.registerPlugin(ScrollTrigger);

// ?static schaltet jede Bewegung ab — für PDF-Export und Screenshots.
const staticMode = new URLSearchParams(location.search).has('static');
const reducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches || staticMode;

/* ---------- Smooth Scroll (Lenis) ---------- */
let lenis: Lenis | null = null;

if (!reducedMotion) {
  lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Anker-Navigation (Deep-Links bleiben erhalten) ---------- */
document.querySelectorAll<HTMLAnchorElement>('a[data-scroll]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const hash = a.getAttribute('href');
    if (!hash || !hash.startsWith('#')) return;
    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;
    e.preventDefault();
    history.pushState(null, '', hash);
    if (lenis) {
      lenis.scrollTo(target, { offset: 0 });
    } else {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  });
});

/* ---------- Dot-Navigation: aktiven Abschnitt markieren ---------- */
const navLinks = new Map<string, HTMLAnchorElement>();
document
  .querySelectorAll<HTMLAnchorElement>('.dotnav a[href^="#"]')
  .forEach((a) => navLinks.set(a.getAttribute('href')!.slice(1), a));

document.querySelectorAll<HTMLElement>('main section[id]').forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top 55%',
    end: 'bottom 55%',
    onToggle: (self) => {
      if (!self.isActive) return;
      navLinks.forEach((a, id) =>
        a.classList.toggle('is-active', id === sec.id)
      );
    },
  });
});

/* Ab hier nur Bewegung — bei reduced motion ist Schluss. */
if (!reducedMotion) {
  /* ---------- Hero-Entrance ---------- */
  gsap.from('.hero__copy > *', {
    y: 26,
    autoAlpha: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.09,
    delay: 0.1,
  });
  gsap.from('.ig-tile', {
    y: 46,
    autoAlpha: 0,
    duration: 1.1,
    ease: 'power3.out',
    delay: 0.35,
  });
  gsap.from('.serp-slab', {
    y: 22,
    autoAlpha: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.75,
  });

  /* ---------- Sanfte Reveals ---------- */
  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.from(el, {
      y: 24,
      autoAlpha: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 87%', once: true },
    });
  });

  /* ---------- Signature: Ein Artikel fächert 25 Rankings auf ---------- */
  const proof = document.getElementById('proof');
  const article = document.getElementById('proof-article');
  const fans = gsap.utils.toArray<HTMLElement>('[data-fan]');

  const center = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  if (proof && article && fans.length) {
    const mm = gsap.matchMedia();

    // Desktop: Sektion pinnen, Chips fliegen aus dem Artikel heraus.
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: proof,
          start: 'top top+=72',
          end: '+=1500',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.from(article, {
        y: 70,
        autoAlpha: 0,
        scale: 0.94,
        duration: 0.7,
        ease: 'power2.out',
      });

      tl.from(
        fans,
        {
          x: (_i: number, el: HTMLElement) => center(article).x - center(el).x,
          y: (_i: number, el: HTMLElement) => center(article).y - center(el).y,
          scale: 0.5,
          autoAlpha: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: { each: 0.12 },
        },
        '+=0.15'
      );
    });

    // Mobil: keine Pin-Choreografie, nur ruhige Reveals.
    mm.add('(max-width: 767px)', () => {
      gsap.from(article, {
        y: 26,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: article, start: 'top 87%', once: true },
      });
      fans.forEach((el) => {
        gsap.from(el, {
          y: 18,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
    });
  }
}
