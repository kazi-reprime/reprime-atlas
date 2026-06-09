"use client";
import { useEffect, useRef } from "react";

type Hub = { x: number; y: number; name: string; weight: number };

const HUBS: Hub[] = [
  { x: 140, y: 250, name: "Seattle", weight: 1.0 },
  { x: 160, y: 410, name: "Bay Area", weight: 1.3 },
  { x: 220, y: 470, name: "LA", weight: 1.4 },
  { x: 360, y: 380, name: "Denver", weight: 0.9 },
  { x: 340, y: 460, name: "Phoenix", weight: 1.0 },
  { x: 470, y: 460, name: "Dallas", weight: 1.2 },
  { x: 500, y: 530, name: "Houston", weight: 1.1 },
  { x: 580, y: 360, name: "Chicago", weight: 1.2 },
  { x: 690, y: 480, name: "Atlanta", weight: 1.1 },
  { x: 800, y: 540, name: "Miami", weight: 1.3 },
  { x: 850, y: 260, name: "Boston", weight: 1.1 },
  { x: 830, y: 320, name: "NYC", weight: 1.5 },
  { x: 800, y: 380, name: "DC", weight: 1.0 },
];

const NUM_PARTICLES = 900;

export default function CapitalFlowField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx2d = cv.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const W = 1000, H = 600;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr;
    cv.height = H * dpr;
    cv.style.width = "100%";
    cv.style.height = "100%";
    ctx.scale(dpr, dpr);

    type P = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number };
    const particles: P[] = Array.from({ length: NUM_PARTICLES }, () => spawn());

    function spawn(): P {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: 0,
        vy: 0,
        life: Math.random() * 80,
        maxLife: 90 + Math.random() * 120,
      };
    }

    function field(x: number, y: number, t: number) {
      let vx = 0, vy = 0;
      for (const h of HUBS) {
        const dx = h.x - x, dy = h.y - y;
        const d2 = dx * dx + dy * dy + 50;
        const k = h.weight * 1800 / d2;
        vx += dx * k / Math.sqrt(d2);
        vy += dy * k / Math.sqrt(d2);
      }
      vx += Math.sin(y * 0.012 + t * 0.0003) * 0.6;
      vy += Math.cos(x * 0.012 + t * 0.0003) * 0.6;
      const m = Math.sqrt(vx * vx + vy * vy);
      const max = 2.2;
      if (m > max) { vx = vx / m * max; vy = vy / m * max; }
      return { vx, vy };
    }

    ctx.fillStyle = "#091533";
    ctx.fillRect(0, 0, W, H);

    let raf = 0;
    let lastHubFlash = 0;
    function draw(t: number) {
      ctx.fillStyle = "rgba(9, 21, 51, 0.06)";
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        const { vx, vy } = field(p.x, p.y, t);
        p.vx = p.vx * 0.9 + vx * 0.1;
        p.vy = p.vy * 0.9 + vy * 0.1;
        const px = p.x, py = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const tNorm = Math.min(1, speed / 2.2);
        const r = Math.round(212 + (232 - 212) * tNorm);
        const g = Math.round(175 - (175 - 118) * tNorm);
        const b = Math.round(55 + (58 - 55) * tNorm);
        const alpha = 0.15 + speed * 0.28;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(0.85, alpha)})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (p.life > p.maxLife || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          Object.assign(p, spawn());
        }
      }

      if (t - lastHubFlash > 950) {
        lastHubFlash = t;
        const h = HUBS[Math.floor(Math.random() * HUBS.length)];
        ctx.fillStyle = "rgba(232, 118, 58, 0.5)";
        ctx.beginPath();
        ctx.arc(h.x, h.y, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const h of HUBS) {
        ctx.fillStyle = "rgba(232, 118, 58, 0.85)";
        ctx.beginPath();
        ctx.arc(h.x, h.y, 3.5 * h.weight, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(250, 250, 247, 0.85)";
        ctx.font = "10px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText(h.name, h.x + 6, h.y - 4);
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="block h-full w-full" aria-label="Capital flow field" />;
}
