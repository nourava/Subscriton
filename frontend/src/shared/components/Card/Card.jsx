import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './Card.css';

export const Card = ({
  children,
  title,
  subtitle,
  actions,
  variant = 'default', // default (white card with subtle border), navy (featured deep blue card), interactive
  withArrow = false,   // corner arrow indicator from reference image 2
  className = '',
  ...props
}) => {
  return (
    <div className={`bl-card bl-card--${variant} ${className}`} {...props}>
      {(title || subtitle || actions || withArrow) && (
        <div className="bl-card__header">
          <div>
            {title && <h3 className="bl-card__title">{title}</h3>}
            {subtitle && <p className="bl-card__subtitle">{subtitle}</p>}
          </div>
          <div className="bl-card__actions">
            {actions}
            {withArrow && (
              <span className="bl-card__corner-arrow">
                <ArrowRight size={16} />
              </span>
            )}
          </div>
        </div>
      )}
      <div className="bl-card__content">{children}</div>
    </div>
  );
};
