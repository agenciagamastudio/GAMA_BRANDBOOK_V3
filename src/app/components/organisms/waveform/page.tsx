"use client";
import { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";

function SectionHeader({ number, title, desc }: { number: string; title: string; desc?: string }) {
  return (
    <header style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-primary)", fontWeight: 700, letterSpacing: 0.2 }}>── {number}</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 8px", letterSpacing: -0.5 }}>{title}</h2>
      {desc && <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: 14, maxWidth: 720 }}>{desc}</p>}
    </header>
  );
}

const CODE = `function Waveform({ playing, color = "var(--color-primary)", bars = 32 }) {
  const BAR_COUNT = bars;
  const heights = Array.from({ length: BAR_COUNT }, () => Math.random() * 60 + 20);
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center", height: 60 }}>
      {heights.map((h, i) => (
        <div key={i} style={{
          width: 3, height: h,
          background: color,
          borderRadius: 2,
          animation: playing ? "wave 0.8s ease-in-out infinite alternate" : "none",
          animationDelay: i * 0.03 + "s",
          opacity: playing ? 1 : 0.3,
          transition: "opacity 0.3s",
        }} />
      ))}
    </div>
  );
}`;

function Waveform({ playing, color = "var(--color-primary)", bars = 40, height = 60 }: {
  playing: boolean; color?: string; bars?: number; height?: number;
}) {
  const heightsRef = useRef<number[]>(Array.from({ length: bars }, (_, i) => {
    const x = i / bars;
    return Math.sin(x * Math.PI) * 40 + Math.random() * 30 + 10;
  }));

  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center", height, width: "100%" }}>
      {heightsRef.current.map((h, i) => (
        <div key={i} style={{
          flex: 1, height: `${h}%`, minHeight: 3,
          background: color,
          borderRadius: 2,
          animation: playing ? `wave-bar 0.6s ease-in-out infinite alternate` : "none",
          animationDelay: `${(i * 0.02) % 0.6}s`,
          opacity: playing ? 1 : 0.25,
          transition: "opacity 0.3s, height 0.3s",
        }} />
      ))}
    </div>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function WaveformPage() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const duration = 237;
  const currentTime = Math.floor((progress / 100) * duration);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { setPlaying(false); return 0; }
        return prev + 0.2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);

  const tracks = [
    { title: "Liquid Glass Ambient", artist: "GAMA Audio", duration: "3:57", active: true },
    { title: "Volumetric Bass", artist: "GAMA Audio", duration: "4:23", active: false },
    { title: "Neon Pulse", artist: "GAMA Audio", duration: "2:48", active: false },
  ];

  return (
    <PageLayout
      title="Waveform"
      accentWord="Waveform"
      subtitle="Visualizador de áudio animado com barras CSS. Player completo com waveform, progress, volume e playlist."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Organisms", href: "/components/organisms/tables" },
        { label: "Waveform" },
      ]}
      badge="ORGANISM"
    >
      <style>{`
        @keyframes wave-bar {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }
      `}</style>

      {/* Full player */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Audio Player Completo" desc="Waveform + controls + progress + volume." />
        <div className="glass-illuminated" style={{ padding: 32, borderRadius: "var(--radius-lg)" }}>
          {/* Track info */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: "var(--color-primary-dim)", border: "2px solid rgba(136,206,17,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
              🎵
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 16 }}>Liquid Glass Ambient</p>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--color-text-muted)" }}>GAMA Audio · 3:57</p>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--color-text-muted)" }}>♥</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--color-text-muted)" }}>⋯</button>
          </div>

          {/* Waveform */}
          <div style={{ marginBottom: 12, cursor: "pointer", padding: "4px 0" }} onClick={() => {
            const e = window.event as MouseEvent;
            const target = e.currentTarget as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            setProgress(((e.clientX - rect.left) / rect.width) * 100);
          }}>
            <Waveform playing={playing} bars={80} height={56} />
          </div>

          {/* Progress bar */}
          <div style={{ position: "relative", height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginBottom: 8, cursor: "pointer" }}
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress}%`, background: "var(--color-primary)", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: `${progress}%`, top: "50%", transform: "translate(-50%, -50%)", width: 12, height: 12, borderRadius: "50%", background: "var(--color-primary)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{formatTime(currentTime)}</span>
            <span style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, justifyContent: "center", marginBottom: 20 }}>
            {["⏮", "⏪"].map((btn) => (
              <button key={btn} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--color-text-secondary)", padding: "8px 12px" }}>{btn}</button>
            ))}
            <button onClick={() => setPlaying(!playing)} style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "var(--color-primary)", border: "none", cursor: "pointer",
              fontSize: 22, color: "#000", display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 12px", fontWeight: 900,
            }}>
              {playing ? "⏸" : "▶"}
            </button>
            {["⏩", "⏭"].map((btn) => (
              <button key={btn} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--color-text-secondary)", padding: "8px 12px" }}>{btn}</button>
            ))}
          </div>

          {/* Volume */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 16, color: "var(--color-text-muted)" }}>🔈</span>
            <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(+e.target.value)} style={{ flex: 1, accentColor: "var(--color-primary)" }} />
            <span style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", width: 32, textAlign: "right" }}>{volume}%</span>
          </div>
        </div>
      </section>

      {/* Compact waveform */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Waveform Compacto" desc="Versão reduzida para listas de podcast e áudio." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          {tracks.map((track, i) => (
            <div key={track.title} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
              borderBottom: i < tracks.length - 1 ? "1px solid var(--color-border)" : "none",
              background: track.active ? "var(--color-primary-dim)" : "transparent",
            }}>
              <button style={{ width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer", background: track.active ? "var(--color-primary)" : "var(--color-surface-2)", color: track.active ? "#000" : "var(--color-text)", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {track.active ? "⏸" : "▶"}
              </button>
              <div style={{ width: 120, flexShrink: 0 }}>
                <Waveform playing={track.active && playing} bars={30} height={32} color={track.active ? "var(--color-primary)" : "var(--color-border)"} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: track.active ? 700 : 400, fontSize: 14, color: track.active ? "var(--color-primary)" : "var(--color-text)" }}>{track.title}</p>
                <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>{track.artist}</p>
              </div>
              <span style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{track.duration}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Voice recording */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Voice Recording" desc="UI de gravação com waveform animado em tempo real." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{ width: "100%", maxWidth: 480 }}>
              <Waveform playing={true} bars={60} height={64} color="var(--color-error)" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-error)", animation: "pulse-dot 1s ease-in-out infinite" }} />
              <span style={{ fontSize: 13, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>0:42</span>
              <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>Gravando...</span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn btn-ghost btn-sm">⏸ Pausar</button>
              <button className="btn btn-destructive btn-sm">⏹ Parar</button>
            </div>
          </div>
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Código" />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 12 }}>{CODE}</pre>
        </div>
      </section>
    </PageLayout>
  );
}
