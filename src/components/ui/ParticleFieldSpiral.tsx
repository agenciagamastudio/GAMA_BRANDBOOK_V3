"use client";

import { useEffect, useRef } from "react";

interface Particle {
  index: number;
  size: number;
  color: string;
  layerSpeed: number;
}

export default function ParticleFieldSpiral({ height = 400 }: { height?: number }) {
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
    const COUNT = 100;

    const particles: Particle[] = Array.from({ length: COUNT }, (_, i) => ({
      index: i,
      size: 1 + Math.random() * 2.5,
      color: `rgba(136, 206, 17, ${0.3 + Math.random() * 0.6})`,
      layerSpeed: 0.008 + Math.random() * 0.012,
    }));

    let raf = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Fundo com gradiente radial
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, h) / 2);
      grad.addColorStop(0, "rgba(136,206,17,0.06)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, h);

      time += 0.016;

      particles.forEach((p) => {
        // Espiral: raio aumenta com tempo, ângulo também
        const spiralRadius = 20 + (time * p.layerSpeed * 100 + p.index * 2) % 120;
        const spiralAngle = (time * p.layerSpeed + (p.index / COUNT) * Math.PI * 2) * 2;

        const x = centerX + Math.cos(spiralAngle) * spiralRadius;
        const y = centerY + Math.sin(spiralAngle) * spiralRadius;

        // Opacidade: mais alta no meio da espiral, fade nas extremidades
        const opacityFade = Math.max(0, 1 - spiralRadius / 150);

        ctx.beginPath();
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${opacityFade * 0.7})`);
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
        ✦ Movimento Espiral
      </div>
    </div>
  );
}
