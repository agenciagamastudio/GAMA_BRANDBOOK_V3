import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  color = 'var(--color-border, rgba(255,255,255,0.1))',
  className = '',
  style,
}) => {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={className}
        style={{
          display: 'inline-block',
          width: 1,
          alignSelf: 'stretch',
          backgroundColor: color,
          flexShrink: 0,
          ...style,
        }}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          width: '100%',
          ...style,
        }}
      >
        <span style={{ flex: 1, height: 1, backgroundColor: color }} />
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--color-text-muted, #71717a)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          {label}
        </span>
        <span style={{ flex: 1, height: 1, backgroundColor: color }} />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={className}
      style={{
        border: 'none',
        borderTop: `1px solid ${color}`,
        margin: 0,
        width: '100%',
        ...style,
      }}
    />
  );
};

export default Divider;
