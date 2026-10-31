import React from 'react';
import './PageHeader.css';

export const PageHeader = ({ title, accentWord, description, badge, actions }) => {
  return (
    <div className="bl-page-header">
      <div className="bl-page-header__left">
        <div className="bl-page-header__title-row">
          <h1 className="bl-page-header__title">
            {title} {accentWord && <span className="bl-title-accent">{accentWord}</span>}
          </h1>
          {badge && <span className="bl-page-header__badge">{badge}</span>}
        </div>
        {description && <p className="bl-page-header__desc">{description}</p>}
      </div>
      {actions && <div className="bl-page-header__actions">{actions}</div>}
    </div>
  );
};
