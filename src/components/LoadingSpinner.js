import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', text = 'Cargando...' }) => {
  return (
    <div className="loading-spinner">
      <div className={`loading-spinner__spinner loading-spinner__spinner--${size}`}></div>
      {text && <p className="loading-spinner__text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
