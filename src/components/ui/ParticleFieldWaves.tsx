"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseY: number;
  vx: number;
  amplitude: number;
  frequency: number;
  phase: number;
  size: number;
  opacity: number;
  color: string;
}

export default function ParticleFieldWaves({ height = 400 }: { height?: number }) {
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

    const COUNT = 80;
    const particles: Particle[] = Array.from({ length: COUNT }, (_, i) => ({
      x: (i / COUNT) * width,
      y: h / 2,
      baseY: h / 2,
      vx: 0.5 + Math.random() * 0.5,
      amplitude: 30 + Math.random() * 50,
      frequency: 0.02 + Math.random() * 0.02,
      phase: (i / COUNT) * Math.PI * 2,
      size: 1.2 + Math.random() * 2,
      opacity: 0.4 + Math.random() * 0.5,
      color: `rgba(136, 206, 17, ${0.4 + Math.random() * 0.5})`,
    }));

    let raf = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Fundo com gradiente
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "rgba(136,206,17,0.03)");
      grad.addColorStop(0.5, "rgba(136,206,17,0.06)");
      grad.addColorStop(1, "rgba(136,206,17,0.03)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, h);

      time += 0.016;

      particles.forEach((p) => {
        // Movimento horizontal contínuo
        p.x += p.vx;

        // Wrap ao lado oposto
        if (p.x > width + 10) {
          p.x = -10;
        }

        // Movimento ondulatório (sinusoidal + time variável)
        const waveY = Math.sin((p.x * p.frequency + time * 2 + p.phase) * Math.PI) * p.amplitude;
        const y = p.baseY + waveY;

        // Draw como círculo com glow
        ctx.beginPath();
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.opacity})`);
        ctx.shadowColor = "rgba(136,206,17,0.5)";
        ctx.shadowBlur = 10;
        ctx.arc(p.x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

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
        ✦ Ondas Sinusoidais
      </div>
    </div>
  );
}
