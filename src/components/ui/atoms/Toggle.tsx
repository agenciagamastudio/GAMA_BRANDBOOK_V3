'use client';

import React from 'react';

type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: ToggleSize;
  label?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap: Record<ToggleSize, { trackW: number; trackH: number; thumbSize: number; thumbOffset: number }> = {
  sm: { trackW: 32, trackH: 18, thumbSize: 12, thumbOffset: 3 },
  md: { trackW: 44, trackH: 24, thumbSize: 18, thumbOffset: 3 },
  lg: { trackW: 56, trackH: 30, thumbSize: 22, thumbOffset: 4 },
};

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  size = 'md',
  label,
  disabled = false,
  className = '',
  style,
}) => {
  const { trackW, trackH, thumbSize, thumbOffset } = sizeMap[size];
  const thumbTranslate = checked ? trackW - thumbSize - thumbOffset : thumbOffset;

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: trackW,
    height: trackH,
    borderRadius: trackH,
    backgroundColor: checked
      ? 'var(--color-primary, #88ce11)'
      : 'var(--color-surface-3, #303030)',
    border: `1.5px solid ${checked ? 'transparent' : 'var(--color-border, rgba(255,255,255,0.1))'}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 200ms cubic-bezier(0.4,0,0.2,1), border-color 200ms',
    flexShrink: 0,
    opacity: disabled ? 0.5 : 1,
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    width: thumbSize,
    height: thumbSize,
    borderRadius: '50%',
    backgroundColor: checked ? '#111' : 'var(--color-text-secondary, #a1a1aa)',
    transform: `translateX(${thumbTranslate}px)`,
    transition: 'transform 200ms cubic-bezier(0.34,1.56,0.64,1), background-color 200ms',
    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
  };

  const handleClick = () => {
    if (!disabled) onChange(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) onChange(!checked);
    }
  };

  const toggle = (
    <span
      role="switch"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={trackStyle}
    >
      <span style={thumbStyle} />
    </span>
  );

  if (!label) {
    return (
      <span className={className} style={style}>
        {toggle}
      </span>
    );
  }

  return (
    <label
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {toggle}
      <span
        style={{
          fontSize: size === 'sm' ? 13 : size === 'lg' ? 16 : 15,
          color: 'var(--color-text, #ffffff)',
          userSelect: 'none',
        }}
      >
        {label}
      </span>
    </label>
  );
};

export default Toggle;
