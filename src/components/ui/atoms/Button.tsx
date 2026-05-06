import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const spinnerStyle: React.CSSProperties = {
  display: 'inline-block',
  width: 16,
  height: 16,
  border: '2px solid currentColor',
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: 'btn-spin 0.7s linear infinite',
  flexShrink: 0,
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const sizeClass = size !== 'md' ? ` btn-${size}` : '';
    const classes = `btn btn-${variant}${sizeClass}${className ? ` ${className}` : ''}`;

    return (
      <>
        <style suppressHydrationWarning>{`
          @keyframes btn-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        <button
          ref={ref}
          className={classes}
          disabled={disabled || loading}
          aria-busy={loading}
          style={style}
          {...rest}
        >
          {loading && <span style={spinnerStyle} aria-hidden="true" />}
          {!loading && leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>}
          {children}
          {!loading && rightIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>}
        </button>
      </>
    );
  }
);

Button.displayName = 'Button';

export default Button;
