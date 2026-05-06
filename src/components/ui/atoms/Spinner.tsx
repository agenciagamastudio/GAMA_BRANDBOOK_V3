import React from 'react';
import GamaLogo from './GamaLogo';

type SpinnerVariant = 'ring' | 'dots' | 'gama' | 'gama-letter';

export interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: number;
  color?: string;
  label?: string;
}

const SPINNER_STYLES = `
@keyframes gama-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes gama-dot-pulse { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
@keyframes gama-letter-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

const Spinner: React.FC<SpinnerProps> = ({
  variant = 'ring',
  size = 32,
  color = 'var(--color-primary, #88ce11)',
  label,
}) => {
  if (variant === 'ring') {
    const ringStyle: React.CSSProperties = {
      display: 'inline-block',
      width: size,
      height: size,
      border: `${Math.max(2, Math.round(size * 0.1))}px solid ${color}`,
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'gama-spin 0.7s linear infinite',
      flexShrink: 0,
    };
    return (
      <>
        <style suppressHydrationWarning>{SPINNER_STYLES}</style>
        <span
          role="status"
          aria-label={label ?? 'Loading'}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={ringStyle} aria-hidden="true" />
        </span>
      </>
    );
  }

  if (variant === 'dots') {
    const dotSize = Math.max(4, Math.round(size * 0.22));
    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(dotSize * 0.6),
    };
    return (
      <>
        <style suppressHydrationWarning>{SPINNER_STYLES}</style>
        <span role="status" aria-label={label ?? 'Loading'} style={containerStyle}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                backgroundColor: color,
                animation: `gama-dot-pulse 1.2s ease-in-out ${i * 0.16}s infinite`,
              }}
            />
          ))}
        </span>
      </>
    );
  }

  if (variant === 'gama') {
    const ringThickness = Math.max(2, Math.round(size * 0.075));
    const innerSize = size - ringThickness * 3;
    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      flexShrink: 0,
    };
    const ringStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      width: size,
      height: size,
      border: `${ringThickness}px solid ${color}`,
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'gama-spin 1s linear infinite',
    };
    return (
      <>
        <style suppressHydrationWarning>{SPINNER_STYLES}</style>
        <span role="status" aria-label={label ?? 'Loading'} style={containerStyle}>
          <span style={ringStyle} aria-hidden="true" />
          <GamaLogo size={innerSize} variant="green" />
        </span>
      </>
    );
  }

  // gama-letter
  const letterStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: Math.round(size * 0.219),
    background: 'linear-gradient(145deg, #a3e010 0%, #88ce11 45%, #6fa80a 100%)',
    animation: 'gama-letter-spin 1.2s linear infinite',
    filter: `drop-shadow(0 0 ${Math.round(size * 0.2)}px rgba(136,206,17,0.5))`,
    flexShrink: 0,
  };
  const glyphStyle: React.CSSProperties = {
    fontFamily: 'var(--font-main, "Poppins", sans-serif)',
    fontWeight: 900,
    fontSize: Math.round(size * 0.56),
    color: '#111',
    lineHeight: 1,
    userSelect: 'none',
  };
  return (
    <>
      <style suppressHydrationWarning>{SPINNER_STYLES}</style>
      <span role="status" aria-label={label ?? 'Loading'} style={{ display: 'inline-flex' }}>
        <span style={letterStyle} aria-hidden="true">
          <span style={glyphStyle}>G</span>
        </span>
      </span>
    </>
  );
};

export default Spinner;
