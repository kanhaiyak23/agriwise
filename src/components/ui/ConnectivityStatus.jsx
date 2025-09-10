import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ConnectivityStatus = ({ 
  isOnline = true,
  lastSyncTime = '2 minutes ago',
  pendingSyncCount = 0,
  onSync,
  onRetry
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(isOnline);

  useEffect(() => {
    const handleOnline = () => setConnectionStatus(true);
    const handleOffline = () => setConnectionStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSync = () => {
    if (onSync) onSync();
    setIsExpanded(false);
  };

  const handleRetry = () => {
    if (onRetry) onRetry();
    setIsExpanded(false);
  };

  const getStatusIcon = () => {
    if (!connectionStatus) return 'WifiOff';
    if (pendingSyncCount > 0) return 'RefreshCw';
    return 'Wifi';
  };

  const getStatusColor = () => {
    if (!connectionStatus) return 'text-error';
    if (pendingSyncCount > 0) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="relative">
      {/* Status Indicator */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleExpanded}
        className={`${getStatusColor()} hover:bg-muted`}
        title={connectionStatus ? 'Connected' : 'Offline'}
      >
        <Icon 
          name={getStatusIcon()} 
          size={16} 
          className={pendingSyncCount > 0 ? 'animate-spin' : ''} 
        />
        {pendingSyncCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-warning text-warning-foreground text-xs rounded-full flex items-center justify-center font-data">
            {pendingSyncCount > 9 ? '9+' : pendingSyncCount}
          </span>
        )}
      </Button>

      {/* Expanded Status Details */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-popover border border-border rounded-lg shadow-medium z-1001">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-body font-semibold text-sm text-popover-foreground">
                Connection Status
              </h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${connectionStatus ? 'bg-success' : 'bg-error'}`} />
                <span className={`font-body text-sm ${getStatusColor()}`}>
                  {connectionStatus ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Last sync:</span>
                <span className="font-data">{lastSyncTime}</span>
              </div>
              
              {pendingSyncCount > 0 && (
                <div className="flex justify-between">
                  <span>Pending updates:</span>
                  <span className="font-data text-warning">{pendingSyncCount}</span>
                </div>
              )}
            </div>

            {!connectionStatus && (
              <div className="p-3 bg-muted rounded-md">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium">Offline Mode Active</p>
                    <p>Your data will sync when connection is restored.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-2 pt-2 border-t border-border">
              {connectionStatus && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={handleSync}
                  className="flex-1"
                >
                  Sync Now
                </Button>
              )}
              
              {!connectionStatus && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={handleRetry}
                  className="flex-1"
                >
                  Retry Connection
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectivityStatus;