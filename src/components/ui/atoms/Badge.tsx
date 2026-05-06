import React from 'react';

type BadgeVariant = 'green' | 'blue' | 'muted' | 'error' | 'warning' | 'info';
type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const dotColors: Record<BadgeVariant, string> = {
  green: '#88ce11',
  blue: '#3b82f6',
  muted: '#71717a',
  error: '#e11d48',
  warning: '#f59e0b',
  info: '#3b82f6',
};

const dotStyle = (variant: BadgeVariant): React.CSSProperties => ({
  display: 'inline-block',
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: dotColors[variant],
  marginRight: 5,
  flexShrink: 0,
});

const variantClassMap: Record<BadgeVariant, string> = {
  green: 'pill pill-green',
  blue: 'pill pill-blue',
  muted: 'pill pill-muted',
  error: 'pill pill-muted',
  warning: 'pill pill-muted',
  info: 'pill pill-blue',
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'muted',
  size = 'md',
  dot = false,
  children,
  className = '',
  style,
}) => {
  const baseClass = variantClassMap[variant];
  const sizeStyle: React.CSSProperties =
    size === 'sm'
      ? { fontSize: '11px', padding: '2px 8px', gap: 4 }
      : { fontSize: '12px', padding: '3px 10px', gap: 5 };

  return (
    <span
      className={`${baseClass}${className ? ` ${className}` : ''}`}
      style={{ display: 'inline-flex', alignItems: 'center', ...sizeStyle, ...style }}
    >
      {dot && <span style={dotStyle(variant)} aria-hidden="true" />}
      {children}
    </span>
  );
};

export default Badge;
