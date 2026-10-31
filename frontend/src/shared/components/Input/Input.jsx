import React from 'react';
import './Input.css';

export const Input = ({
  label,
  error,
  helperText,
  icon = null,
  id,
  type = 'text',
  className = '',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`bl-form-group ${error ? 'bl-form-group--error' : ''} ${className}`}>
      {label && <label htmlFor={inputId} className="bl-form-label">{label}</label>}
      <div className="bl-input-wrapper">
        {icon && <span className="bl-input-icon">{icon}</span>}
        <input
          id={inputId}
          type={type}
          className={`bl-input ${icon ? 'bl-input--with-icon' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="bl-form-error">{error}</span>}
      {helperText && !error && <span className="bl-form-helper">{helperText}</span>}
    </div>
  );
};

export const Select = ({
  label,
  error,
  options = [],
  id,
  className = '',
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`bl-form-group ${error ? 'bl-form-group--error' : ''} ${className}`}>
      {label && <label htmlFor={selectId} className="bl-form-label">{label}</label>}
      <select id={selectId} className="bl-select" {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="bl-form-error">{error}</span>}
    </div>
  );
};
