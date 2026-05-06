"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  drift: number;
  opacity: number;
  color: string;
  baseOpacity: number;
}

export default function ParticleField({ height = 320 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

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

    const COUNT = 90;
    const colors = [
      "rgba(136, 206, 17, 1)",
      "rgba(136, 206, 17, 0.85)",
      "rgba(255, 255, 255, 0.6)",
      "rgba(255, 255, 255, 0.4)",
    ];

    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const baseOpacity = 0.3 + Math.random() * 0.5;
      return {
        x: Math.random() * width,
        y: Math.random() * h + h * 0.2,
        size: 1 + Math.random() * 3,
        speedY: 0.2 + Math.random() * 1.0,
        drift: (Math.random() - 0.5) * 0.4,
        opacity: baseOpacity,
        baseOpacity,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    let raf = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // soft background gradient wash
      const grad = ctx.createRadialGradient(width / 2, h, 0, width / 2, h, h);
      grad.addColorStop(0, "rgba(136,206,17,0.06)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, h);

      const m = mouseRef.current;

      particles.forEach((p) => {
        // gravity-like upward float
        p.y -= p.speedY;
        p.x += p.drift;

        // mouse attraction
        if (m.active) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (1 - dist / 140) * 0.6;
            p.x += dx * force * 0.04;
            p.y += dy * force * 0.04;
            p.opacity = Math.min(1, p.baseOpacity + force * 0.5);
          } else {
            p.opacity = p.baseOpacity;
          }
        }

        // wrap
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // draw
        ctx.beginPath();
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.opacity})`);
        ctx.shadowColor = "rgba(136,206,17,0.5)";
        ctx.shadowBlur = 8;
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

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
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
        background:
          "linear-gradient(180deg, rgba(22,22,22,0.6) 0%, rgba(22,22,22,1) 100%)",
        border: "1px solid var(--color-border-green)",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 100%, rgba(136,206,17,0.18) 0%, transparent 60%)",
        }}
      />
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
        ✦ Hover sobre o canvas para interagir
      </div>
    </div>
  );
}
