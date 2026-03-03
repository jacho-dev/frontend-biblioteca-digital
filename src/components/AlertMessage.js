import React, { useEffect } from 'react';
import './AlertMessage.css';

const iconByType = {
  success: 'fa-circle-check',
  warning: 'fa-triangle-exclamation',
  danger: 'fa-circle-xmark',
  info: 'fa-circle-info'
};

const titleByType = {
  success: 'Exito',
  warning: 'Advertencia',
  danger: 'Error',
  info: 'Informacion'
};

const AlertMessage = ({ alert, onClose }) => {
  useEffect(() => {
    if (!alert) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [alert, onClose]);

  if (!alert) return null;

  const iconClass = iconByType[alert.type] || iconByType.info;
  const title = titleByType[alert.type] || titleByType.info;

  return (
    <div
      className="alert-modal"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={`alert-message alert-message--${alert.type}`} role="alertdialog" aria-modal="true">
        <div className="alert-message__header">
          <i className={`fa-solid ${iconClass} alert-message__icon`} aria-hidden="true" />
          <h2 className="alert-message__title">{title}</h2>
        </div>
        <div className="alert-message__content">
          <p>{alert.message}</p>
        </div>
        <div className="alert-message__actions">
          <button type="button" className="alert-message__button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertMessage;
