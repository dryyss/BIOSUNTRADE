import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'yellow';
  className?: string;
};

export function Button({ children, to, onClick, variant = 'primary', className }: ButtonProps) {
  const classes = `btn ${variant === 'primary' ? 'btn-primary' : variant === 'outline' ? 'btn-outline' : 'btn-yellow'} ${className ?? ''}`;
  if (to) {
    return (
      <a href={to} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}



