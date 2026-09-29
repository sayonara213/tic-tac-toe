'use client';

import { useEffect, useRef } from 'react';
import { fx, type FxEvent } from '@/lib/client/fx';
import { useMotion } from '@/lib/client/prefs';

const TONE = { o: 0x8edbc6, x: 0x5aa9dc } as const;
const PEARL = 0xe9fbd9;

/**
 * Foreground effects above the board: a ripple where a mark lands, a pearl
 * sweep and spray along a winning line, and rising bubbles for the winner.
 * The ticker only runs while something is animating.
 */
export default function PixiFx() {
  const host = useRef<HTMLDivElement>(null);
  const motion = useMotion();

  useEffect(() => {
    if (!motion || !host.current) return;
    let disposed = false;
    let destroy = () => {};

    (async () => {
      const PIXI = await import('pixi.js');
      const { softDot, bubble } = await import('./softTexture');
      if (disposed) return;

      const app = new PIXI.Application();
      try {
        await app.init({
          resizeTo: window,
          backgroundAlpha: 0,
          antialias: true,
          autoDensity: true,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
        });
      } catch {
        return; // no WebGL/WebGPU: the DOM still shows every state
      }
      if (disposed) {
        app.destroy(true);
        return;
      }
      host.current!.appendChild(app.canvas);
      app.ticker.stop();

      const dot = softDot(32, 0.4);
      const bub = bubble(64);

      type Anim = (dt: number) => boolean; // returns false when finished
      const anims = new Set<Anim>();
      const run = (a: Anim) => {
        anims.add(a);
        if (!app.ticker.started) app.ticker.start();
      };
      app.ticker.add((ticker) => {
        const dt = Math.min(ticker.deltaMS / 1000, 0.05);
        for (const a of anims) if (!a(dt)) anims.delete(a);
        if (anims.size === 0) {
          app.renderer.render(app.stage);
          app.ticker.stop();
        }
      });

      const ring = (x: number, y: number, color: number, maxR: number, life: number, width = 3) => {
        const g = new PIXI.Graphics();
        app.stage.addChild(g);
        let t = 0;
        run((dt) => {
          t += dt / life;
          const e = 1 - Math.pow(1 - Math.min(t, 1), 3);
          g.clear()
            .circle(x, y, 6 + e * maxR)
            .stroke({ color, width: width * (1 - e) + 0.5, alpha: 0.9 * (1 - e) });
          if (t >= 1) {
            g.destroy();
            return false;
          }
          return true;
        });
      };

      const spray = (
        x: number,
        y: number,
        colors: number[],
        n: number,
        speed: number,
        gravity: number,
        tex = dot,
      ) => {
        const parts = Array.from({ length: n }, (_, i) => {
          const s = new PIXI.Sprite(tex);
          s.anchor.set(0.5);
          s.tint = colors[i % colors.length];
          const size = 4 + Math.random() * 8;
          s.width = s.height = size;
          s.position.set(x, y);
          s.blendMode = 'add';
          app.stage.addChild(s);
          const a = Math.random() * Math.PI * 2;
          const v = speed * (0.4 + Math.random() * 0.6);
          return { s, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0.7 + Math.random() * 0.6 };
        });
        let t = 0;
        run((dt) => {
          t += dt;
          let alive = false;
          for (const p of parts) {
            if (p.s.destroyed) continue;
            p.vy += gravity * dt;
            p.vx *= 0.98;
            p.s.x += p.vx * dt;
            p.s.y += p.vy * dt;
            p.s.alpha = Math.max(0, 1 - t / p.life);
            if (t >= p.life) p.s.destroy();
            else alive = true;
          }
          return alive;
        });
      };

      const sweep = (points: { x: number; y: number }[]) => {
        const a = points[0];
        const b = points[points.length - 1];
        const g = new PIXI.Graphics();
        g.blendMode = 'add';
        app.stage.addChild(g);
        let t = 0;
        run((dt) => {
          t += dt;
          const grow = Math.min(t / 0.35, 1);
          const fade = t < 1.1 ? 1 : Math.max(0, 1 - (t - 1.1) / 0.6);
          const ex = a.x + (b.x - a.x) * grow;
          const ey = a.y + (b.y - a.y) * grow;
          g.clear()
            .moveTo(a.x, a.y)
            .lineTo(ex, ey)
            .stroke({ color: PEARL, width: 18, alpha: 0.18 * fade, cap: 'round' })
            .moveTo(a.x, a.y)
            .lineTo(ex, ey)
            .stroke({ color: PEARL, width: 5, alpha: 0.9 * fade, cap: 'round' });
          if (fade <= 0) {
            g.destroy();
            return false;
          }
          return true;
        });
      };

      const rise = (color: number) => {
        const { width: w, height: h } = app.screen;
        const n = w < 640 ? 40 : 80;
        const parts = Array.from({ length: n }, (_, i) => {
          const s = new PIXI.Sprite(i % 3 ? bub : dot);
          s.anchor.set(0.5);
          s.tint = i % 2 ? color : PEARL;
          s.width = s.height = 8 + Math.random() * 22;
          s.position.set(Math.random() * w, h + 20 + Math.random() * h * 0.4);
          app.stage.addChild(s);
          return { s, vy: -(160 + Math.random() * 220), sway: Math.random() * 6, x0: s.x };
        });
        let t = 0;
        run((dt) => {
          t += dt;
          let alive = false;
          for (const p of parts) {
            if (p.s.destroyed) continue;
            p.s.y += p.vy * dt;
            p.s.x = p.x0 + Math.sin(t * 2 + p.sway) * 14;
            p.s.alpha = Math.min(1, Math.max(0, p.s.y / (h * 0.6)));
            if (p.s.y < -40) p.s.destroy();
            else alive = true;
          }
          return alive && t < 6;
        });
      };

      const onFx = (e: FxEvent) => {
        if (e.type === 'ripple') {
          ring(e.x, e.y, TONE[e.tone], 70, 0.6);
          spray(e.x, e.y, [TONE[e.tone], PEARL], 10, 160, 0);
        } else if (e.type === 'win') {
          sweep(e.points);
          e.points.forEach((p, i) =>
            setTimeout(() => {
              ring(p.x, p.y, PEARL, 90, 0.8, 4);
              spray(p.x, p.y, [PEARL, TONE[e.tone]], 26, 320, 380);
            }, i * 90),
          );
          if (e.celebrate) setTimeout(() => rise(TONE[e.tone]), 250);
        } else if (e.type === 'draw') {
          e.points.forEach((p, i) => setTimeout(() => ring(p.x, p.y, PEARL, 40, 0.7, 2), i * 40));
        }
      };
      const off = fx.on(onFx);

      destroy = () => {
        off();
        app.destroy(true, { children: true, texture: true });
      };
    })();

    return () => {
      disposed = true;
      destroy();
    };
  }, [motion]);

  return (
    <div
      ref={host}
      aria-hidden
      className='pointer-events-none fixed inset-0 z-40 [&>canvas]:!h-full [&>canvas]:!w-full'
    />
  );
}
