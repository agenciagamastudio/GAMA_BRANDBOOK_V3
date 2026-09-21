"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function ParticleFieldRain({ height = 400 }: { height?: number }) {
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

    const COUNT = 120;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * h - h,
      size: 0.8 + Math.random() * 1.2,
      speedY: 2 + Math.random() * 3,
      opacity: 0.4 + Math.random() * 0.5,
      color: `rgba(136, 206, 17, ${0.4 + Math.random() * 0.5})`,
    }));

    let raf = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Fundo com gradiente sutil
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(136,206,17,0.02)");
      grad.addColorStop(1, "rgba(136,206,17,0.06)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, h);

      particles.forEach((p) => {
        // Queda livre
        p.y += p.speedY;

        // Wrap ao bottom
        if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        // Draw como chuva (linhas verticais)
        ctx.strokeStyle = p.color.replace(/[\d.]+\)$/, `${p.opacity})`);
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - 8);
        ctx.lineTo(p.x, p.y + 2);
        ctx.stroke();
      });

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
        background: "linear-gradient(180deg, rgba(22,22,22,0.8) 0%, rgba(22,22,22,1) 100%)",
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
        ✦ Chuva de Partículas
      </div>
    </div>
  );
}
