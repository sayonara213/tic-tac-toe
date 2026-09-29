import { Texture } from 'pixi.js';

/** A white radial falloff, tinted per sprite. Shared by every effect. */
export function softDot(size = 64, hardness = 0.35): Texture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(hardness, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return Texture.from(c);
}

/** A bubble: a thin bright rim with a highlight, like light on a water droplet. */
export function bubble(size = 64): Texture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const r = size / 2;
  const g = ctx.createRadialGradient(r, r, r * 0.55, r, r, r);
  g.addColorStop(0, 'rgba(255,255,255,0.05)');
  g.addColorStop(0.85, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.beginPath();
  ctx.ellipse(r * 0.65, r * 0.6, r * 0.18, r * 0.1, -0.6, 0, Math.PI * 2);
  ctx.fill();
  return Texture.from(c);
}

/** Reads a CSS custom property as a Pixi-friendly colour + alpha. */
export function cssColor(name: string): { color: number; alpha: number } {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = raw.match(/^#([0-9a-f]{6})$/i);
  if (hex) return { color: parseInt(hex[1], 16), alpha: 1 };
  const rgba = raw.match(/rgba?\(([^)]+)\)/);
  if (rgba) {
    const [r, g, b, a = '1'] = rgba[1].split(',').map((s) => s.trim());
    return { color: (+r << 16) | (+g << 8) | +b, alpha: +a };
  }
  return { color: 0xffffff, alpha: 1 };
}
