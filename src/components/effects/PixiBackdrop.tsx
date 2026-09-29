'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotion, usePrefs } from '@/lib/client/prefs';

/**
 * The page's water: aurora glows that drift on 60s+ loops, light motes and
 * bubbles that rise slowly and part around the pointer. Sits behind the
 * Console. Decorative only, so it is hidden from assistive tech and only runs
 * while Effects is on and the OS does not ask for reduced motion.
 */
export default function PixiBackdrop() {
  const host = useRef<HTMLDivElement>(null);
  const motion = useMotion();
  const { theme } = usePrefs();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!motion || !host.current) return;
    let disposed = false;
    let destroy = () => {};

    (async () => {
      const PIXI = await import('pixi.js');
      const { softDot, bubble, cssColor } = await import('./softTexture');
      if (disposed) return;

      const app = new PIXI.Application();
      try {
        await app.init({
          resizeTo: window,
          backgroundAlpha: 0,
          antialias: false,
          autoDensity: true,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          powerPreference: 'low-power',
        });
      } catch {
        return; // no WebGL/WebGPU: the CSS aurora stays visible
      }
      if (disposed) {
        app.destroy(true);
        return;
      }
      host.current!.appendChild(app.canvas);
      setReady(true);

      const small = window.innerWidth < 640;
      const glowTex = softDot(256, 0);
      const moteTex = softDot(32, 0.2);
      const bubbleTex = bubble(64);

      // Aurora glows.
      const glows = (['--glow-teal', '--glow-sea', '--glow-kelp'] as const).map((name, i) => {
        const s = new PIXI.Sprite(glowTex);
        const { color, alpha } = cssColor(name);
        s.anchor.set(0.5);
        s.tint = color;
        s.alpha = alpha;
        s.blendMode = theme === 'night' ? 'add' : 'normal';
        app.stage.addChild(s);
        return { s, phase: i * 2.1, period: 60 + i * 17 };
      });

      // Motes and bubbles.
      const { color: ink } = cssColor('--ink');
      const count = small ? 26 : 56;
      const layer = new PIXI.Container();
      app.stage.addChild(layer);
      const bits = Array.from({ length: count }, (_, i) => {
        const isBubble = i % 4 === 0;
        const s = new PIXI.Sprite(isBubble ? bubbleTex : moteTex);
        s.anchor.set(0.5);
        const size = isBubble ? 8 + Math.random() * 18 : 2 + Math.random() * 5;
        s.width = s.height = size;
        s.tint = ink;
        s.alpha = isBubble ? 0.35 : 0.15 + Math.random() * 0.3;
        layer.addChild(s);
        return {
          s,
          x: Math.random() * app.screen.width,
          y: Math.random() * app.screen.height,
          vy: -(isBubble ? 8 + Math.random() * 10 : 3 + Math.random() * 6),
          wobble: Math.random() * Math.PI * 2,
          ox: 0,
          oy: 0,
        };
      });

      const pointer = { x: -9999, y: -9999 };
      const onMove = (e: PointerEvent) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      };
      const onLeave = () => {
        pointer.x = pointer.y = -9999;
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);

      let t = 0;
      app.ticker.maxFPS = small ? 30 : 60;
      app.ticker.add((ticker) => {
        const dt = ticker.deltaMS / 1000;
        t += dt;
        const { width: w, height: h } = app.screen;
        const base = Math.max(w, h);

        glows.forEach(({ s, phase, period }, i) => {
          const a = (t / period) * Math.PI * 2 + phase;
          const anchors = [
            [0.1, 0.05],
            [0.95, 0.35],
            [0.45, 1.0],
          ][i];
          s.x = w * anchors[0] + Math.cos(a) * w * 0.06;
          s.y = h * anchors[1] + Math.sin(a * 0.8) * h * 0.05;
          s.width = s.height = base * (0.95 + 0.08 * Math.sin(a * 0.5));
        });

        for (const b of bits) {
          b.wobble += dt * 0.8;
          b.y += b.vy * dt;
          b.x += Math.sin(b.wobble) * 6 * dt;
          // Part around the pointer, then ease back.
          const dx = b.x + b.ox - pointer.x;
          const dy = b.y + b.oy - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120 && d2 > 1) {
            const f = (1 - Math.sqrt(d2) / 120) * 90 * dt;
            const d = Math.sqrt(d2);
            b.ox += (dx / d) * f;
            b.oy += (dy / d) * f;
          }
          b.ox *= 0.96;
          b.oy *= 0.96;
          if (b.y < -30) {
            b.y = h + 30;
            b.x = Math.random() * w;
          }
          b.s.position.set(b.x + b.ox, b.y + b.oy);
        }
      });

      const onVisibility = () => (document.hidden ? app.ticker.stop() : app.ticker.start());
      document.addEventListener('visibilitychange', onVisibility);

      destroy = () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerleave', onLeave);
        document.removeEventListener('visibilitychange', onVisibility);
        app.destroy(true, { children: true, texture: true });
      };
    })();

    return () => {
      disposed = true;
      setReady(false);
      destroy();
    };
  }, [motion, theme]);

  return (
    <div aria-hidden className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
      {/* CSS glows: always there, so the page looks right without WebGL. */}
      <div className={`aurora absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-0' : ''}`}>
        <i />
      </div>
      <div ref={host} className='absolute inset-0 [&>canvas]:!h-full [&>canvas]:!w-full' />
    </div>
  );
}
