import React from 'react';

type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  size?: InputSize;
}

const sizeStyles: Record<InputSize, React.CSSProperties> = {
  sm: { height: 32, fontSize: 13, padding: '0 10px' },
  md: { height: 40, fontSize: 15, padding: '0 14px' },
  lg: { height: 48, fontSize: 16, padding: '0 16px' },
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      leftAddon,
      rightAddon,
      size = 'md',
      className = '',
      style,
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const wrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    };

    const addonStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      color: 'var(--color-text-secondary, #a1a1aa)',
      pointerEvents: 'none',
    };

    const inputStyle: React.CSSProperties = {
      ...sizeStyles[size],
      width: '100%',
      paddingLeft: leftAddon ? 36 : sizeStyles[size].padding as string,
      paddingRight: rightAddon ? 36 : sizeStyles[size].padding as string,
      ...(error ? { borderColor: 'var(--color-error, #e11d48)' } : {}),
      ...style,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--color-text-secondary, #a1a1aa)',
              lineHeight: 1.4,
            }}
          >
            {label}
          </label>
        )}
        <div style={wrapperStyle}>
          {leftAddon && (
            <span style={{ ...addonStyle, left: 10 }}>{leftAddon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`input-field${className ? ` ${className}` : ''}`}
            style={inputStyle}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
            }
            {...rest}
          />
          {rightAddon && (
            <span style={{ ...addonStyle, right: 10 }}>{rightAddon}</span>
          )}
        </div>
        {error && (
          <span
            id={`${inputId}-error`}
            style={{ fontSize: 12, color: 'var(--color-error, #e11d48)', lineHeight: 1.4 }}
            role="alert"
          >
            {error}
          </span>
        )}
        {!error && helper && (
          <span
            id={`${inputId}-helper`}
            style={{ fontSize: 12, color: 'var(--color-text-muted, #71717a)', lineHeight: 1.4 }}
          >
            {helper}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
