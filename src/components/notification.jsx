import { useState, useEffect } from 'react';
import '../styles/notification.css';

export default function NotificationModal({ show, onClose, type, title, message }) {
  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div className="notification-overlay" onClick={onClose}>
      <div className={`notification-content notification-${type}`} onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <div className={`notification-icon notification-icon-${type}`}>
            {getIcon()}
          </div>
          <h3 className="notification-title">{title}</h3>
        </div>
        
        <div className="notification-body">
          <p>{message}</p>
        </div>
        
        <div className="notification-footer">
          <button onClick={onClose} className="notification-ok-btn">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}