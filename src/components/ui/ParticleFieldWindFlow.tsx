"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  turbulence: number;
}

export default function ParticleFieldWindFlow({ height = 400 }: { height?: number }) {
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

    const COUNT = 100;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * h,
      vx: 0.8 + Math.random() * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
      color: `rgba(136, 206, 17, ${0.35 + Math.random() * 0.45})`,
      turbulence: Math.random(),
    }));

    let raf = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Fundo com gradiente direcional
      const grad = ctx.createLinearGradient(0, 0, width, h);
      grad.addColorStop(0, "rgba(136,206,17,0.02)");
      grad.addColorStop(0.5, "rgba(136,206,17,0.04)");
      grad.addColorStop(1, "rgba(136,206,17,0.02)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, h);

      time += 0.016;

      particles.forEach((p) => {
        // Movimento horizontal (vento principal)
        p.x += p.vx;

        // Turbulência: oscilação vertical + ruído
        const turbulence = Math.sin(time * 1.5 + p.turbulence * Math.PI * 2) * 0.5 +
                          Math.cos(time * 0.8 + p.x * 0.01) * 0.3;
        p.vy = turbulence * 0.15;
        p.y += p.vy;

        // Wrap: volta pelo início (efeito contínuo de vento)
        if (p.x > width + 10) {
          p.x = -10;
          p.y = Math.random() * h;
        }

        // Wrap vertical com suavidade
        if (p.y < -10) {
          p.y = h + 10;
        } else if (p.y > h + 10) {
          p.y = -10;
        }

        // Variação de opacidade baseada em posição vertical
        const verticalFade = 1 - Math.abs(p.y - h / 2) / (h / 2);
        const finalOpacity = p.opacity * (0.3 + verticalFade * 0.7);

        ctx.beginPath();
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${finalOpacity})`);
        ctx.shadowColor = "rgba(136,206,17,0.4)";
        ctx.shadowBlur = 6;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
        ✦ Fluxo de Ar
      </div>
    </div>
  );
}
