"use client";

import { useRef, useEffect } from "react";

const COLORS = [
  "#F03728", "#FF5140", "#E52016", "#C41E0E",
  "#1A1A1A", "#2D2D2D", "#F03728", "#FF5140",
];

interface Ball {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: string;
}

// Balls start staggered above the canvas top — they fall in on mount
function makeBalls(w: number, n: number): Ball[] {
  return Array.from({ length: n }, (_, i) => ({
    x: 20 + Math.random() * (w - 40),
    y: -(15 + i * 14 + Math.random() * 20),
    vx: (Math.random() - 0.5) * 2.5,
    vy: 0.8 + Math.random() * 1.5,
    r: 10 + Math.random() * 20,
    color: COLORS[i % COLORS.length],
  }));
}

function resolveCollision(a: Ball, b: Ball) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  const minD = a.r + b.r;
  if (dist >= minD || dist === 0) return;
  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = (minD - dist) * 0.5;
  a.x -= nx * overlap;
  a.y -= ny * overlap;
  b.x += nx * overlap;
  b.y += ny * overlap;
  const relV = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
  if (relV >= 0) return;
  a.vx -= relV * nx * 0.7;
  a.vy -= relV * ny * 0.7;
  b.vx += relV * nx * 0.7;
  b.vy += relV * ny * 0.7;
}

export function BallpitCanvas({ count = 48 }: { count?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    const W = wrap.offsetWidth;
    const H = wrap.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const balls = makeBalls(W, count);
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (const b of balls) {
        // Cursor repulsion
        const cdx = b.x - mouse.x;
        const cdy = b.y - mouse.y;
        const cd = Math.hypot(cdx, cdy);
        if (cd < 130 && cd > 0) {
          const f = ((130 - cd) / 130) * 1.2;
          b.vx += (cdx / cd) * f;
          b.vy += (cdy / cd) * f;
        }

        b.vy += 0.3;     // gravity
        b.vx *= 0.986;   // friction
        b.vy *= 0.986;

        const spd = Math.hypot(b.vx, b.vy);
        if (spd > 13) { b.vx = (b.vx / spd) * 13; b.vy = (b.vy / spd) * 13; }

        b.x += b.vx;
        b.y += b.vy;

        if (b.x - b.r < 0)   { b.x = b.r;     b.vx =  Math.abs(b.vx) * 0.78; }
        if (b.x + b.r > W)   { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.78; }
        if (b.y - b.r < 0)   { b.y = b.r;     b.vy =  Math.abs(b.vy) * 0.78; }
        if (b.y + b.r > H)   { b.y = H - b.r; b.vy = -Math.abs(b.vy) * 0.78; }
      }

      for (let i = 0; i < balls.length; i++)
        for (let j = i + 1; j < balls.length; j++)
          resolveCollision(balls[i], balls[j]);

      // Flat solid fill — ballpit aesthetic, no glow
      for (const b of balls) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [count]);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
