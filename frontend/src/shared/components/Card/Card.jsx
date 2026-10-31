import React from 'react';
import './Card.css';

export const Card = ({
  children,
  title,
  subtitle,
  actions,
  className = '',
  glass = true,
  ...props
}) => {
  return (
    <div className={`bl-card ${glass ? 'bl-card--glass' : ''} ${className}`} {...props}>
      {(title || subtitle || actions) && (
        <div className="bl-card__header">
          <div>
            {title && <h3 className="bl-card__title">{title}</h3>}
            {subtitle && <p className="bl-card__subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="bl-card__actions">{actions}</div>}
        </div>
      )}
      <div className="bl-card__content">{children}</div>
    </div>
  );
};
