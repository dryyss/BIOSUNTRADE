import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'yellow';
  className?: string;
  leftIcon?: ReactNode;
};

export function Button({ children, to, onClick, variant = 'primary', className, leftIcon }: ButtonProps) {
  const classes = `btn ${variant === 'primary' ? 'btn-primary' : variant === 'outline' ? 'btn-outline' : 'btn-yellow'} ${className ?? ''}`;
  if (to) {
    return (
      <a href={to} className={classes} onClick={onClick}>
        {leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
        {children}
      </a>
    );
  }
  return (
    <button className={classes} onClick={onClick}>
      {leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
      {children}
    </button>
  );
}



