"use client";

import { useEffect, useRef } from "react";

interface Particle {
  gridX: number;
  gridY: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  color: string;
  phase: number;
}

export default function ParticleFieldGridPulse({ height = 400 }: { height?: number }) {
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

    const GRID_COLS = 8;
    const GRID_ROWS = 6;
    const SPACING_X = width / (GRID_COLS + 1);
    const SPACING_Y = h / (GRID_ROWS + 1);

    const particles: Particle[] = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        particles.push({
          gridX: col,
          gridY: row,
          baseX: SPACING_X * (col + 1),
          baseY: SPACING_Y * (row + 1),
          size: 1.5 + Math.random() * 1.5,
          opacity: 0.4 + Math.random() * 0.4,
          color: `rgba(136, 206, 17, ${0.35 + Math.random() * 0.5})`,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    let raf = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Fundo com gradiente radial do centro
      const centerX = width / 2;
      const centerY = h / 2;
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, h) / 2);
      grad.addColorStop(0, "rgba(136,206,17,0.05)");
      grad.addColorStop(0.5, "rgba(136,206,17,0.02)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, h);

      time += 0.016;

      // Pulse global
      const globalPulse = Math.sin(time * 1.2) * 0.5 + 0.5;

      particles.forEach((p) => {
        // Distorção baseada em posição no grid (mais distorcida nas extremidades)
        const distX = (p.gridX - GRID_COLS / 2) / (GRID_COLS / 2);
        const distY = (p.gridY - GRID_ROWS / 2) / (GRID_ROWS / 2);
        const distanceFactor = Math.sqrt(distX * distX + distY * distY);

        // Pulse local (cada partícula tem phase diferente)
        const localPulse = Math.sin(time * 1.5 + p.phase) * 0.7 + 0.3;

        // Distorção sinusoidal no espaço X e Y
        const offsetX = Math.sin(time * 1.3 + p.gridY * 0.3) * distanceFactor * 15 * localPulse;
        const offsetY = Math.cos(time * 1.0 + p.gridX * 0.3) * distanceFactor * 15 * localPulse;

        const x = p.baseX + offsetX;
        const y = p.baseY + offsetY;

        // Tamanho varia com pulse
        const sizeVar = p.size * (0.7 + globalPulse * 0.6);

        // Opacidade varia com pulse
        const opacityVar = p.opacity * (0.4 + globalPulse * 0.6);

        // Draw círculo com glow
        ctx.beginPath();
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${opacityVar})`);
        ctx.shadowColor = "rgba(136,206,17,0.4)";
        ctx.shadowBlur = 8 + globalPulse * 4;
        ctx.arc(x, y, sizeVar, 0, Math.PI * 2);
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
        ✦ Grid Pulsante
      </div>
    </div>
  );
}
