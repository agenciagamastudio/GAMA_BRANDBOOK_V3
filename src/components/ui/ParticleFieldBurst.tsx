"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  life: number;
}

export default function ParticleFieldBurst({ height = 400 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let h = height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    let burstTimer = 0;

    const createBurst = (x: number, y: number) => {
      for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1 + Math.random() * 2.5,
          opacity: 0.8,
          maxOpacity: 0.8,
          color: `rgba(136, 206, 17, 1)`,
          life: 1,
        });
      }
    };

    let raf = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Fundo
      const grad = ctx.createRadialGradient(width / 2, h / 2, 0, width / 2, h / 2, Math.max(width, h) / 2);
      grad.addColorStop(0, "rgba(136,206,17,0.04)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, h);

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.life -= 0.02;
        p.opacity = p.maxOpacity * Math.max(0, p.life);

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.opacity})`);
        ctx.shadowColor = "rgba(136,206,17,0.5)";
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Trigger burst
      burstTimer++;
      if (burstTimer > 60) {
        const x = Math.random() * width;
        const y = Math.random() * h * 0.7 + h * 0.15;
        createBurst(x, y);
        burstTimer = 0;
      }

      raf = requestAnimationFrame(render);
    };

    render();

    const onResize = () => {
      width = container.clientWidth;
      canvas.width = width * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [height]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height,
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(22,22,22,0.6) 0%, rgba(22,22,22,1) 100%)",
        border: "1px solid var(--color-border-green)",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 20,
          fontSize: 11,
          color: "var(--color-text-muted)",
          textTransform: "uppercase",
          letterSpacing: 0.1,
          fontWeight: 700,
          pointerEvents: "none",
        }}
      >
        ✦ Explosão Contínua
      </div>
    </div>
  );
}
