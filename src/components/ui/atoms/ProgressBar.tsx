import React from 'react';

type ProgressVariant = 'default' | 'success' | 'warning' | 'error';
type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const variantColors: Record<ProgressVariant, string> = {
  default: 'var(--color-primary, #88ce11)',
  success: 'var(--color-success, #10b981)',
  warning: 'var(--color-warning, #f59e0b)',
  error: 'var(--color-error, #e11d48)',
};

const heightMap: Record<ProgressSize, number> = { sm: 4, md: 8, lg: 12 };

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  label,
  showValue = false,
  animated = false,
  className = '',
  style,
}) => {
  const clampedValue = Math.min(Math.max(0, value), max);
  const pct = (clampedValue / max) * 100;
  const height = heightMap[size];
  const color = variantColors[variant];

  const trackStyle: React.CSSProperties = {
    width: '100%',
    height,
    borderRadius: height,
    backgroundColor: 'var(--color-surface-3, #303030)',
    overflow: 'hidden',
  };

  const fillStyle: React.CSSProperties = {
    height: '100%',
    width: `${pct}%`,
    borderRadius: height,
    backgroundColor: color,
    transition: 'width 400ms cubic-bezier(0.4,0,0.2,1)',
    position: 'relative',
    overflow: 'hidden',
  };

  const shimmerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.6s linear infinite',
  };

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}
    >
      {(label || showValue) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {label && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-text-secondary, #a1a1aa)',
              }}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--color-text, #ffffff)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        style={trackStyle}
      >
        <div style={fillStyle}>
          {animated && <div style={shimmerStyle} aria-hidden="true" />}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
