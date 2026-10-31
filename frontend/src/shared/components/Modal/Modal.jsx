import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

export const Modal = ({ isOpen, onClose, title, subtitle, children, footer }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="bl-modal-backdrop" onClick={onClose}>
      <div className="bl-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="bl-modal-header">
          <div>
            {title && <h2 className="bl-modal-title">{title}</h2>}
            {subtitle && <p className="bl-modal-subtitle">{subtitle}</p>}
          </div>
          <button className="bl-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        <div className="bl-modal-body">{children}</div>
        {footer && <div className="bl-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
