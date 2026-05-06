import React from 'react';

type SkeletonVariant = 'text' | 'circle' | 'rect';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  variant?: SkeletonVariant;
  lines?: number;
  className?: string;
  style?: React.CSSProperties;
}

const SKELETON_STYLES = `
@keyframes skeleton-shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
`;

const baseSkeletonStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%)',
  backgroundSize: '800px 100%',
  animation: 'skeleton-shimmer 1.6s ease-in-out infinite',
  display: 'block',
};

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  variant = 'rect',
  lines = 3,
  className = '',
  style,
}) => {
  if (variant === 'circle') {
    const sz = width ?? height ?? 40;
    return (
      <>
        <style suppressHydrationWarning>{SKELETON_STYLES}</style>
        <span
          className={className}
          style={{
            ...baseSkeletonStyle,
            width: sz,
            height: sz,
            borderRadius: '50%',
            flexShrink: 0,
            ...style,
          }}
          aria-hidden="true"
        />
      </>
    );
  }

  if (variant === 'text') {
    const lineWidths = ['100%', '85%', '60%'];
    return (
      <>
        <style suppressHydrationWarning>{SKELETON_STYLES}</style>
        <div
          className={className}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}
          aria-hidden="true"
        >
          {Array.from({ length: lines }).map((_, i) => (
            <span
              key={i}
              style={{
                ...baseSkeletonStyle,
                width: lineWidths[i % lineWidths.length],
                height: height ?? 14,
                borderRadius: borderRadius ?? '4px',
                display: 'block',
              }}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <style suppressHydrationWarning>{SKELETON_STYLES}</style>
      <span
        className={className}
        style={{
          ...baseSkeletonStyle,
          width: width ?? '100%',
          height: height ?? 20,
          borderRadius: borderRadius ?? '8px',
          display: 'block',
          ...style,
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default Skeleton;
