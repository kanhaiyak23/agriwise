import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AlertBanner = ({ 
  type = 'warning', 
  message = 'Weather alert: Heavy rain expected in your area within 2 hours. Secure equipment and check drainage.',
  isVisible = true,
  onDismiss,
  actionLabel,
  onAction
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isVisible || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) onDismiss();
  };

  const getAlertStyles = () => {
    switch (type) {
      case 'error': case'critical':
        return {
          bg: 'bg-error',
          text: 'text-error-foreground',
          icon: 'AlertTriangle'
        };
      case 'warning':
        return {
          bg: 'bg-warning',
          text: 'text-warning-foreground',
          icon: 'AlertCircle'
        };
      case 'success':
        return {
          bg: 'bg-success',
          text: 'text-success-foreground',
          icon: 'CheckCircle'
        };
      case 'info':
      default:
        return {
          bg: 'bg-primary',
          text: 'text-primary-foreground',
          icon: 'Info'
        };
    }
  };

  const alertStyles = getAlertStyles();

  return (
    <div className={`fixed top-16 left-0 right-0 z-1001 ${alertStyles?.bg} ${alertStyles?.text} shadow-medium`}>
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Icon 
            name={alertStyles?.icon} 
            size={20} 
            className="flex-shrink-0" 
          />
          <p className="font-body text-sm font-medium truncate lg:whitespace-normal">
            {message}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {actionLabel && onAction && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAction}
              className={`${alertStyles?.text} hover:bg-white/20 border border-white/30`}
            >
              {actionLabel}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className={`${alertStyles?.text} hover:bg-white/20 flex-shrink-0`}
            iconName="X"
          />
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;