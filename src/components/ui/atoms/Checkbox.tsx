'use client';

import React, { useEffect, useRef } from 'react';

type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  label?: string;
  disabled?: boolean;
  size?: CheckboxSize;
  className?: string;
  style?: React.CSSProperties;
}

const boxSizeMap: Record<CheckboxSize, number> = { sm: 14, md: 18, lg: 22 };

const CheckIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    style={{ display: 'block' }}
  >
    <polyline
      points="3,8 7,12 13,4"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DashIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    style={{ display: 'block' }}
  >
    <line
      x1="3"
      y1="8"
      x2="13"
      y2="8"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  indeterminate = false,
  label,
  disabled = false,
  size = 'md',
  className = '',
  style,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const boxSize = boxSizeMap[size];
  const isActive = checked || indeterminate;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const boxStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: boxSize,
    height: boxSize,
    borderRadius: 4,
    border: `2px solid ${isActive ? 'var(--color-primary, #88ce11)' : 'var(--color-border, rgba(255,255,255,0.1))'}`,
    backgroundColor: isActive ? 'var(--color-primary, #88ce11)' : 'transparent',
    transition: 'border-color 150ms, background-color 150ms',
    color: 'var(--color-primary-on, #111)',
    flexShrink: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  const iconSize = Math.round(boxSize * 0.9);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) onChange(e.target.checked);
  };

  const checkbox = (
    <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : checked}
        style={{
          position: 'absolute',
          opacity: 0,
          width: '100%',
          height: '100%',
          cursor: disabled ? 'not-allowed' : 'pointer',
          margin: 0,
          zIndex: 1,
        }}
      />
      <span style={boxStyle} aria-hidden="true">
        {indeterminate ? (
          <DashIcon size={iconSize} />
        ) : checked ? (
          <CheckIcon size={iconSize} />
        ) : null}
      </span>
    </span>
  );

  if (!label) {
    return (
      <span className={className} style={style}>
        {checkbox}
      </span>
    );
  }

  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 16 : 15;

  return (
    <label
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {checkbox}
      <span
        style={{
          fontSize,
          color: 'var(--color-text, #ffffff)',
          userSelect: 'none',
        }}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
