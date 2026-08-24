// Minimale Typ-Shims für Reveal.js (kein offizielles Typenpaket für v5).
declare module 'reveal.js' {
  export interface RevealApi {
    initialize(): Promise<void>;
    slide(h: number, v?: number, f?: number): void;
    getIndices(): { h: number; v: number; f?: number };
    on(event: string, handler: (event?: unknown) => void): void;
    next(): void;
    prev(): void;
  }
  interface RevealConstructor {
    new (options?: Record<string, unknown>): RevealApi;
  }
  const Reveal: RevealConstructor;
  export default Reveal;
}

declare module 'reveal.js/plugin/notes/notes.esm.js' {
  const Notes: unknown;
  export default Notes;
}
