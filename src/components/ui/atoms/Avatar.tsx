import React from 'react';

type AvatarStatus = 'online' | 'offline' | 'busy';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  name?: string;
  status?: AvatarStatus;
  className?: string;
  style?: React.CSSProperties;
}

const statusColors: Record<AvatarStatus, string> = {
  online: 'var(--color-success, #10b981)',
  offline: 'var(--color-text-muted, #71717a)',
  busy: 'var(--color-warning, #f59e0b)',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 40,
  name,
  status,
  className = '',
  style,
}) => {
  const borderRadius = Math.round(size * 0.5);
  const fontSize = Math.round(size * 0.38);
  const statusSize = Math.max(8, Math.round(size * 0.27));

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    flexShrink: 0,
    width: size,
    height: size,
    ...style,
  };

  const avatarStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius,
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: src ? 'transparent' : 'var(--color-surface-3, #303030)',
    border: '1.5px solid var(--color-border, rgba(255,255,255,0.1))',
    overflow: 'hidden',
    flexShrink: 0,
  };

  const initialsStyle: React.CSSProperties = {
    fontFamily: 'var(--font-main, "Poppins", sans-serif)',
    fontWeight: 600,
    fontSize,
    color: 'var(--color-text-secondary, rgba(255, 255, 255, 0.7))',
    userSelect: 'none',
    lineHeight: 1,
  };

  const statusDotStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: statusSize,
    height: statusSize,
    borderRadius: '50%',
    backgroundColor: status ? statusColors[status] : 'transparent',
    border: '2px solid var(--color-bg, #161616)',
  };

  return (
    <span className={className} style={containerStyle}>
      <span style={avatarStyle} aria-label={name ?? alt}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={initialsStyle}>
            {name ? getInitials(name) : '?'}
          </span>
        )}
      </span>
      {status && <span style={statusDotStyle} aria-label={status} />}
    </span>
  );
};

export default Avatar;
