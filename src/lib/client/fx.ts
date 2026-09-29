// Tiny bus between game components and the PixiJS overlay. Components describe
// what happened in screen coordinates; the overlay decides how it looks.

export type FxEvent =
  | { type: 'ripple'; x: number; y: number; tone: 'o' | 'x' }
  | { type: 'win'; points: { x: number; y: number }[]; tone: 'o' | 'x'; celebrate: boolean }
  | { type: 'draw'; points: { x: number; y: number }[] };

type Listener = (e: FxEvent) => void;
const listeners = new Set<Listener>();

export const fx = {
  emit(e: FxEvent) {
    listeners.forEach((l) => l(e));
  },
  on(l: Listener) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

export const centerOf = (el: Element) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};
