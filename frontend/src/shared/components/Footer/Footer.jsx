import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="bl-footer">
      <div className="bl-footer__ticker">
        <div className="bl-footer__ticker-content">
          <span>Subscription Automation</span>
          <span className="bl-ticker-dot">•</span>
          <span>Dynamic Invoicing</span>
          <span className="bl-ticker-dot">•</span>
          <span>Multi-Tier Pricing Plans</span>
          <span className="bl-ticker-dot">•</span>
          <span>Payment Gateway Sync</span>
          <span className="bl-ticker-dot">•</span>
          <span>Financial Reporting & MRR</span>
          <span className="bl-ticker-dot">•</span>
          <span>Customer CRM & Lifecycle</span>
          <span className="bl-ticker-dot">•</span>
          <span>Quotation Conversion Engine</span>
          <span className="bl-ticker-dot">•</span>
        </div>
      </div>
      <div className="bl-footer__bottom">
        <div>
          <strong>Brightloop Operations</strong> – Enterprise Subscription Engine
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          Unified Base Architecture for 4-Developer Team
        </div>
      </div>
    </footer>
  );
};
