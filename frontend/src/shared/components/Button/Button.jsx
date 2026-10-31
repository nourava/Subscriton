import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, ghost, danger
  size = 'md',        // sm, md, lg
  icon = null,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bl-btn bl-btn--${variant} bl-btn--${size} ${className}`}
      {...props}
    >
      {icon && <span className="bl-btn__icon">{icon}</span>}
      <span className="bl-btn__text">{children}</span>
    </button>
  );
};
