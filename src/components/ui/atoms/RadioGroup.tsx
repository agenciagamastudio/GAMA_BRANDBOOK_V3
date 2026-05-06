'use client';

import React from 'react';

type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  size?: RadioSize;
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

const radioSizeMap: Record<RadioSize, { outer: number; inner: number; fontSize: number; gap: number }> = {
  sm: { outer: 14, inner: 6, fontSize: 13, gap: 6 },
  md: { outer: 18, inner: 8, fontSize: 15, gap: 8 },
  lg: { outer: 22, inner: 10, fontSize: 16, gap: 10 },
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  orientation = 'vertical',
  size = 'md',
  name,
  className = '',
  style,
}) => {
  const { outer, inner, fontSize, gap } = radioSizeMap[size];

  return (
    <div
      role="radiogroup"
      className={className}
      style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        gap: orientation === 'vertical' ? 10 : 20,
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        const isDisabled = option.disabled ?? false;

        const outerStyle: React.CSSProperties = {
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: outer,
          height: outer,
          borderRadius: '50%',
          border: `2px solid ${isSelected ? 'var(--color-primary, #88ce11)' : 'var(--color-border, rgba(255,255,255,0.2))'}`,
          backgroundColor: 'transparent',
          transition: 'border-color 150ms',
          flexShrink: 0,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          opacity: isDisabled ? 0.5 : 1,
        };

        const innerStyle: React.CSSProperties = {
          width: inner,
          height: inner,
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary, #88ce11)',
          transition: 'transform 150ms, opacity 150ms',
          transform: isSelected ? 'scale(1)' : 'scale(0)',
          opacity: isSelected ? 1 : 0,
        };

        return (
          <label
            key={option.value}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => !isDisabled && onChange(option.value)}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  margin: 0,
                  zIndex: 1,
                }}
              />
              <span style={outerStyle} aria-hidden="true">
                <span style={innerStyle} />
              </span>
            </span>
            <span
              style={{
                fontSize,
                color: isDisabled ? 'var(--color-text-muted, #71717a)' : 'var(--color-text, #ffffff)',
                userSelect: 'none',
              }}
            >
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;
