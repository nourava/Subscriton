import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // primary (blue pill with arrow), navy, secondary, outline, ghost, danger
  size = 'md',        // sm, md, lg
  icon = null,
  withArrow = false,   // signature circular arrow badge from reference
  arrowType = 'right', // 'right' or 'up-right'
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const isPrimaryOrNavy = variant === 'primary' || variant === 'navy';
  const showArrow = withArrow || isPrimaryOrNavy;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bl-btn bl-btn--${variant} bl-btn--${size} ${showArrow ? 'bl-btn--with-arrow' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="bl-btn__icon">{icon}</span>}
      <span className="bl-btn__text">{children}</span>
      {showArrow && (
        <span className="bl-btn__arrow-bubble">
          {arrowType === 'up-right' ? <ArrowUpRight size={14} /> : <ArrowRight size={14} />}
        </span>
      )}
    </button>
  );
};
