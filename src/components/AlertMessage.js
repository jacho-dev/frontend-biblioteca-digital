import React from 'react';
import './AlertMessage.css';

const iconByType = {
  success: 'fa-circle-check',
  warning: 'fa-triangle-exclamation',
  danger: 'fa-circle-xmark',
  info: 'fa-circle-info'
};

const AlertMessage = ({ alert, onClose }) => {
  if (!alert) return null;

  const iconClass = iconByType[alert.type] || iconByType.info;

  return (
    <div className={`alert alert-${alert.type} alert-message`} role="alert">
      <div className="alert-message__content">
        <i className={`fa-solid ${iconClass} alert-message__icon`} aria-hidden="true" />
        <span>{alert.message}</span>
      </div>
      <button
        type="button"
        className="btn-close alert-message__close"
        aria-label="Cerrar"
        onClick={onClose}
      />
    </div>
  );
};

export default AlertMessage;
