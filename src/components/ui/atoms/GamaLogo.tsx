import React from 'react';
import Image from 'next/image';

type LogoVariant = 'green' | 'dark' | 'light' | 'outline';

export interface GamaLogoProps {
  size?: number;
  variant?: LogoVariant;
  showWordmark?: boolean;
  wordmarkSubtitle?: string;
  className?: string;
  style?: React.CSSProperties;
}

const GamaLogo: React.FC<GamaLogoProps> = ({
  size = 64,
  variant = 'green',
  showWordmark = false,
  wordmarkSubtitle,
  className = '',
  style,
}) => {
  const borderRadius = Math.round(size * 0.219);

  const markStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius,
    overflow: 'hidden',
    flexShrink: 0,
    boxShadow: variant === 'green' ? '0 4px 16px rgba(136,206,17,0.3)' : 'none',
    border: variant === 'outline' ? `${Math.max(2, Math.round(size * 0.04))}px solid #88ce11` : 'none',
    display: 'block',
  };

  const mark = (
    <Image
      src="/brand/gama-icon.svg"
      alt="GAMA"
      width={436}
      height={436}
      style={markStyle}
      unoptimized
    />
  );

  if (!showWordmark) {
    return (
      <span className={className} style={{ display: 'inline-flex', ...style }}>
        {mark}
      </span>
    );
  }

  const wordmarkSize = Math.round(size * 0.44);
  const subtitleSize = Math.round(size * 0.22);

  return (
    <div
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(size * 0.2), ...style }}
    >
      {mark}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-display, "Montserrat", var(--font-main, "Poppins"), sans-serif)',
            fontWeight: 900,
            fontSize: wordmarkSize,
            color: 'var(--color-text, #ffffff)',
            lineHeight: 1.1,
            letterSpacing: '0.04em',
          }}
        >
          GAMA
        </span>
        {wordmarkSubtitle && (
          <span
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontWeight: 400,
              fontSize: subtitleSize,
              color: 'var(--color-text-secondary, #a1a1aa)',
              lineHeight: 1.2,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {wordmarkSubtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default GamaLogo;
