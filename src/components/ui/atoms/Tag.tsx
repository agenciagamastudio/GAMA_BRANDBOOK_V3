import React from 'react';

type TagVariant = 'green' | 'blue' | 'muted' | 'error';
type TagSize = 'sm' | 'md';

export interface TagProps {
  variant?: TagVariant;
  onRemove?: () => void;
  size?: TagSize;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<TagVariant, React.CSSProperties> = {
  green: {
    backgroundColor: 'var(--color-primary-dim)',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-border-green)',
  },
  blue: {
    backgroundColor: 'var(--color-info-dim)',
    color: 'var(--color-info)',
    border: '1px solid var(--color-info-border)',
  },
  muted: {
    backgroundColor: 'var(--color-muted-bg, rgba(113,113,122,0.15))',
    color: 'var(--color-text-secondary)',
    border: '1px solid var(--color-border)',
  },
  error: {
    backgroundColor: 'var(--color-error-dim)',
    color: 'var(--color-error)',
    border: '1px solid var(--color-error-border)',
  },
};

const sizeStyles: Record<TagSize, React.CSSProperties> = {
  sm: { fontSize: 11, padding: '2px 8px', gap: 4, borderRadius: 6 },
  md: { fontSize: 12, padding: '4px 10px', gap: 6, borderRadius: 8 },
};

const Tag: React.FC<TagProps> = ({
  variant = 'muted',
  onRemove,
  size = 'md',
  children,
  className = '',
  style,
}) => {
  const removeButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size === 'sm' ? 12 : 14,
    height: size === 'sm' ? 12 : 14,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    cursor: 'pointer',
    color: 'inherit',
    padding: 0,
    lineHeight: 1,
    fontSize: size === 'sm' ? 9 : 10,
    fontWeight: 700,
    transition: 'background 150ms',
    flexShrink: 0,
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 500,
        fontFamily: 'var(--font-main)',
        whiteSpace: 'nowrap',
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          style={removeButtonStyle}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default Tag;
