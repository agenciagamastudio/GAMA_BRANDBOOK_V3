"use client";

import { useEffect, useRef } from "react";

interface Particle {
  angle: number;
  distance: number;
  speed: number;
  size: number;
  color: string;
  orbitY: number;
}

export default function ParticleFieldOrbits({ height = 400 }: { height?: number }) {
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

    const centerX = width / 2;
    const centerY = h / 2;
    const COUNT = 60;

    const particles: Particle[] = Array.from({ length: COUNT }, (_, i) => ({
      angle: (i / COUNT) * Math.PI * 2,
      distance: 30 + Math.random() * 80,
      speed: 0.01 + Math.random() * 0.03,
      size: 1.5 + Math.random() * 2.5,
      color: `rgba(136, 206, 17, ${0.3 + Math.random() * 0.6})`,
      orbitY: centerY + (Math.random() - 0.5) * 80,
    }));

    let raf = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Fundo com gradiente radial
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, h) / 2);
      grad.addColorStop(0, "rgba(136,206,17,0.08)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, h);

      time += 0.016; // ~60fps

      particles.forEach((p) => {
        const x = centerX + Math.cos(p.angle + time * p.speed) * p.distance;
        const y = p.orbitY + Math.sin(p.angle + time * p.speed) * (p.distance * 0.6);

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = "rgba(136,206,17,0.4)";
        ctx.shadowBlur = 12;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
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
        ✦ Órbitas Circulares
      </div>
    </div>
  );
}
