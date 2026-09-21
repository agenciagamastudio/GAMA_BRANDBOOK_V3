"use client";

import { useEffect, useRef } from "react";

interface Particle {
  angle: number;
  baseDistance: number;
  size: number;
  color: string;
  frequency: number;
  phase: number;
}

export default function ParticleFieldPulse({ height = 400 }: { height?: number }) {
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
    const COUNT = 70;

    const particles: Particle[] = Array.from({ length: COUNT }, (_, i) => ({
      angle: (i / COUNT) * Math.PI * 2,
      baseDistance: 40 + Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      color: `rgba(136, 206, 17, ${0.35 + Math.random() * 0.55})`,
      frequency: 1.5 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Fundo com gradiente radial duplo
      const grad1 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80);
      grad1.addColorStop(0, "rgba(136,206,17,0.08)");
      grad1.addColorStop(1, "rgba(136,206,17,0.02)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, h);

      const grad2 = ctx.createRadialGradient(centerX, centerY, 80, centerX, centerY, Math.max(width, h) / 2);
      grad2.addColorStop(0, "rgba(0,0,0,0)");
      grad2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, h);

      time += 0.016;

      particles.forEach((p) => {
        // Pulsação: distância oscila com seno
        const pulse = Math.sin(time * p.frequency + p.phase);
        const distance = p.baseDistance + pulse * 30;

        const x = centerX + Math.cos(p.angle) * distance;
        const y = centerY + Math.sin(p.angle) * distance;

        // Opacidade pulsa também (correlacionada com distância)
        const opacity = 0.4 + (pulse + 1) / 2 * 0.4;

        ctx.beginPath();
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${opacity})`);
        ctx.shadowColor = "rgba(136,206,17,0.5)";
        ctx.shadowBlur = 8 + Math.abs(pulse) * 6;
        ctx.arc(x, y, p.size + Math.abs(pulse) * 1.5, 0, Math.PI * 2);
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
        ✦ Pulsação Radial
      </div>
    </div>
  );
}
